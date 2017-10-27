import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'slide-init',
  templateUrl: './slide-init.component.html',
  styleUrls: ['./slide-init.component.scss']
})
export class SlideInitComponent implements OnInit {
  @Input('order') public order: number;

  constructor() { }

  ngOnInit() {
  }

}
