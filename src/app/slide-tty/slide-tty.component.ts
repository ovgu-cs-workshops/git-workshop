import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'slide-tty',
  templateUrl: './slide-tty.component.html',
  styleUrls: ['./slide-tty.component.scss']
})
export class SlideTtyComponent implements OnInit {
  @Input('order') public order: number;

  constructor() { }

  ngOnInit() {
  }

}
