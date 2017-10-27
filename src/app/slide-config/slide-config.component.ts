import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'slide-config',
  templateUrl: './slide-config.component.html',
  styleUrls: ['./slide-config.component.scss']
})
export class SlideConfigComponent implements OnInit {
  @Input('order') public order: number;

  constructor() { }

  ngOnInit() {
  }

}
