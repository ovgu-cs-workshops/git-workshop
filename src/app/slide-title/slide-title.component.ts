import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'slide-title',
  templateUrl: './slide-title.component.html',
  styleUrls: ['./slide-title.component.scss']
})
export class SlideTitleComponent implements OnInit {
  @Input('order') public order: number;

  constructor() { }

  ngOnInit() {
  }

}
