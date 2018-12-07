import { Component, QueryList, ViewChildren, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ChapterComponent } from '../chapter/chapter.component';

@Component({
  selector: 'slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.scss']
})
export class SlidesComponent implements AfterViewInit {
  @ViewChildren(ChapterComponent) private _chapters: QueryList<ChapterComponent>;

  private chapter = 0;

  constructor(private _changeDetector: ChangeDetectorRef) {
  }

  public ngAfterViewInit(): void {
    const arr = this._chapters.toArray();
    let position = 0;
    for (let pos = 0; pos < this._chapters.length; pos++) {
      arr[pos].chapterSubject.next(this.chapter++);
      arr[pos].change();
      if (arr[pos - 1]) {
        arr[pos].prevOrder = arr[pos - 1].prevOrder + arr[pos - 1].order;
        arr[pos].prevOrderSubject.next(arr[pos].prevOrder);
      } else {
        arr[pos].prevOrder = 0;
        arr[pos].prevOrderSubject.next(arr[pos].prevOrder);
      }

      position = arr[pos].assignSlidePositions(position);
    }

    this._chapters.forEach(chap => {
      chap.setSlideCount(position);
    });

    this._changeDetector.detectChanges();
  }

  public agenda(config: any): void {
    const graph = new GitGraph({
      ...config,
      orientation: 'vertical',
    });
    const master = graph.branch('master');
    master.commit('Basics');
    const basics = master.branch('basics');
    basics.commit('Introduction to Version Control & Git');
    basics.commit('Interactive Guide to Git Basics');
    master.commit('Workflows');
    const wf = master.branch(<any> {
      name: 'workflows',
      column: 1,
    });
    wf.commit('Most Common Git Workflows');
    master.commit('Tricks');
    const tricks = master.branch(<any> {
      name: 'tricks',
      column: 1,
    });
    tricks.commit('Advanced Tricks With Git');
    master.commit('Q&A');
  }

  public whatIsATag(config: any): void {
    const graph = new GitGraph(config);
    const master = graph.branch('master');
    master.commit('Initial commit');
    master.commit('Add fancy code');
    master.commit('Add documentation');
    master.tag('v0.1.0');
    master.commit('Fix major bugs');
  }

  public howAMergeWorks(config: any): void {
    const graph = new GitGraph(config);
    const master = graph.branch('master');
    master.commit('Fix compiler errors');
    const logging = master.branch('logging');
    logging.commit('Add logging to application');
    master.commit('Add translation to german');
    logging.commit('Add support for log-levels');
    logging.merge(master);
  }

  public gitFlowWorkflow(config: any): void {
    const graph = new GitGraph(config);
    const master = graph.branch('master');
    master.commit('Initial commit');
    const develop = master.branch(<any> {
      name: 'develop',
      column: 2
    });
    develop.commit('Start development');
    const feature = develop.branch(<any> {
      name: 'feature/new-chapter',
      column: 3
    });
    feature.commit('Add new chapter');
    develop.commit('Fix spelling');
    feature.merge(develop);
    const release = develop.branch(<any> {
      name: 'release-v0.1.0',
      column: 1
    });
    release.commit('Prepare for release');
    release.merge(master);
    develop.commit('Start new story');
    master.tag('v0.1.0');
  }

  public fix1(config: any): void {
    const graph = new GitGraph(config);
    const master = graph.branch('master');
    master.commit('commit 1');
    master.commit('commit 2');
    master.commit('commit 3');
    master.commit('commit 4');
    master.commit('commit 5');
  }

  public fix2(config: any): void {
    const graph = new GitGraph(config);
    const master = graph.branch('master');
    master.commit('commit 1');
    master.commit('commit 2-4');
    master.commit('commit 5');
  }

  public reword1(config: any): void {
    const graph = new GitGraph(config);
    const master = graph.branch('master');
    master.commit('commit 1');
    master.commit('commit 2');
    master.commit('commit 3');
    master.commit('commit 4');
    master.commit('commit 5');
  }

  public reword2(config: any): void {
    const graph = new GitGraph(config);
    const master = graph.branch('master');
    master.commit('commit 1');
    master.commit('commit 2');
    master.commit('reword');
    master.commit('commit 4');
    master.commit('commit 5');
  }

  public reword3(config: any): void {
    const graph = new GitGraph(config);
    const master = graph.branch('master');
    master.commit('commit 1');
    master.commit('commit 2');
    master.commit('commit 4');
    master.commit('commit 5');
  }

  public cherrypick1(config: any): void {
    const graph = new GitGraph(config);
    const master = graph.branch('master');
    master.commit('commit 1');
    master.commit('commit 2');
    master.commit('commit 3');
    const dev = master.branch('dev');
    dev.commit('dev commit 1');
    dev.commit('dev commit 2');
    master.commit('commit 4');
  }

  public cherrypick2(config: any): void {
    const graph = new GitGraph(config);
    const master = graph.branch('master');
    master.commit('commit 1');
    master.commit('commit 2');
    master.commit('commit 3');
    const dev = master.branch('dev');
    dev.commit('dev commit 1');
    dev.commit('dev commit 2');
    master.commit('commit 4');
    dev.commit('dev commit 4');
  }
}
