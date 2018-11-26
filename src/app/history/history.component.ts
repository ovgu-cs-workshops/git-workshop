import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { DataSet, Network, Node as visNode, Edge as visEdge } from 'vis';
import { BehaviorSubject } from 'rxjs';

interface Node {
	hash: number;
  message: string;
  branch: string;
  tag: string;
  shadowed: boolean;
  color: string;
  x: number;
  y: number;
}

interface Edge {
	from: string;
  to: string;
  color: string;
  is_merge: boolean;
}

interface Step {
	nodes: Node[];
  edges: Edge[];
}

const node_colors = [
  "#ff9800",
  "#8bc34a",
  "#2196f3",
  "#f44336",
  "#9c27b0",
  "#673ab7",
  "#3f51b5",
  "#03a9f4",
  "#00bcd4",
  "#009688",
  "#4caf50",
  "#cddc39",
  "#ffc107",
  "#ff5722",
  "#795548",
];

function ParseReflog(reflog: string): Step[] {
  let idx = 1;
  const branches = new Map();
  const colors = new Map();
	const steps = [];

	for (let line of reflog.split(';')) {
    line = line.trim();

  	if (line.length <= 0) {
    	continue;
    }

  	const re = /(>)?(.*?)(?:->(.*?))?(?::(.*?))?@(.*)/g;
  	const match = re.exec(line);
    const new_step = !!match[1];
    let branch = match[2] || "";
    const merge = match[3] || "";
    const tag = match[4] || "";
    const message = match[5] || "";

  	if (!colors.has(branch)) {
    	colors.set(branch, node_colors[colors.size]);
    }
    const color = colors.get(branch);

    if (!!new_step || steps.length <= 0) {
    	steps.push({
        nodes: [],
        edges: [],
      });

      // copy branches array to not alter nodes in previous steps
      for (const [branch_name, that_node] of branches.entries()) {
      	branches.set(branch_name, {
        	hash: that_node.hash,
          message: that_node.message,
          branch: that_node.branch,
          tag: that_node.tag,
          shadowed: that_node.shadowed,
          color: that_node.color,
          x: that_node.x,
          y: that_node.y,
        });
      }
    }

    let old_node = null;
    if (branches.has(branch)) {
    	old_node = branches.get(branch);
    }
    let current_step = steps[steps.length - 1];
    let node = {
    	hash: idx,
      message: message,
      branch: branch,
      tag: tag,
      shadowed: false,
      color: color,
      x: !!old_node ? old_node.x : branches.size,
      y: idx,
    };
    current_step.nodes.push(node);

    let from = idx - 1;
    let to = idx;
    if (!!old_node) {
    	from = old_node.hash;
      old_node.branch = "";

			if (!current_step.nodes.includes(old_node)) {
      	current_step.nodes.push(old_node);
      }
    }
    if (from > 0) {
      current_step.edges.push({
        from: from,
        to: to,
        color: color,
        is_merge: false,
      });
    }

    if (!!merge) {
      const merge_node = branches.get(merge);

      if (!merge_node) {
      	console.log("ERROR: Failed to load merge branch " + merge + "...");
        continue;
      }

    	node.branch = merge_node.branch;
      node.color = merge_node.color;
      node.x = merge_node.x;
      current_step.edges[current_step.edges.length - 1].is_merge = true;
      current_step.edges.push({
      	from: merge_node.hash,
        to: to,
        color: merge_node.color,
        is_merge: false,
      });

     	merge_node.branch = "";
      if (!current_step.nodes.includes(merge_node)) {
      	current_step.nodes.push(merge_node);
      }
      old_node.branch = branch;
      branch = merge;
    }

    branches.set(branch, node);

    idx += 1;
  }

  return steps;
}

@Component({
  selector: 'history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  @ViewChild('graph') private _graphElement: ElementRef;
  @ViewChild('spec') private _specElement: ElementRef;

  private _nodes: DataSet<visNode>;
  private _edges: DataSet<visEdge>;
  private _network: Network;
  private _reflog: Step[];
  private _current_step: number;
  private _nodeMap: Map<number, Node>;

  public nodes: Node[];

  constructor() {
  }

  public ngOnInit(): void {
    this.nodes = [];
    this._nodeMap = new Map();
    this._nodes = new DataSet([]);
    this._edges = new DataSet([]);
    this._network = new Network(
      this._graphElement.nativeElement,
      {
        nodes: this._nodes,
        edges: this._edges,
      },
      {
        interaction: {
          dragNodes: false,
          dragView: false,
          hover: false,
          zoomView: false,
        },
        physics: {
          enabled: false,
        },
        edges: {
          smooth: {
            enabled: true,
            type: "horizontal",
            forceDirection: "none",
            roundness: 0.5,
          },
        },
        nodes: {
          font: {
            size: 24,
            face: 'Roboto Mono',
          },
        },
      },
    );

    this._reflog = ParseReflog(this._specElement.nativeElement.innerText);
    this._current_step = 0;
    this._renderStep(this._current_step);
  }

  public nextStep(): void {
    this._renderStep(++this._current_step);
  }

  private _renderStep(step_idx: number): void {
    if (step_idx >= this._reflog.length) {
      return;
    }

    const step = this._reflog[step_idx];

    for (const node of step.nodes) {
      this._nodeMap.set(node.hash, node);
      this._nodes.update({
        id: node.hash,
        label: node.hash.toString(),
        x: 72 * node.x,
        y: -72 * node.y,
        color: node.color,
      });
    }

    this.nodes = Array.from(this._nodeMap.values()).reverse();

    for (const edge of step.edges) {
      this._edges.update({
        from: edge.from,
        to: edge.to,
        width: 3,
        color: {
          color: edge.color,
          highlight: edge.color,
          hover: edge.color,
        },
        smooth: {
          enabled: true,
          type: edge.is_merge ? 'vertical' : 'horizontal',
          roundness: 0.5,
        },
      });
    }

    this._network.fit();
  }
}
