import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'slide-commit',
  templateUrl: './slide-commit.component.html',
  styleUrls: ['./slide-commit.component.scss']
})
export class SlideCommitComponent implements OnInit {
  @Input('order') public order: number;

  constructor() { }

  ngOnInit() {
  }

}
