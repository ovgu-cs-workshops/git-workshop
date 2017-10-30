import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'slide-clone',
  templateUrl: './slide-clone.component.html',
  styleUrls: ['./slide-clone.component.scss']
})
export class SlideCloneComponent implements OnInit {
  @Input('order') public order: number;

  constructor() { }

  ngOnInit() {
  }

}
