import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'slide-commit-example',
  templateUrl: './slide-commit-example.component.html',
  styleUrls: ['./slide-commit-example.component.scss']
})
export class SlideCommitExampleComponent implements OnInit {
  @Input('order') public order: number;

  constructor() { }

  ngOnInit() {
  }

}
