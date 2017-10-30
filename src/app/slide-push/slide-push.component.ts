import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'slide-push',
  templateUrl: './slide-push.component.html',
  styleUrls: ['./slide-push.component.scss']
})
export class SlidePushComponent implements OnInit {
  @Input('order') public order: number;

  constructor() { }

  ngOnInit() {
  }

}
