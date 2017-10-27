import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'slide-readme',
  templateUrl: './slide-readme.component.html',
  styleUrls: ['./slide-readme.component.scss']
})
export class SlideReadmeComponent implements OnInit {
  @Input('order') public order: number;

  constructor() { }

  ngOnInit() {
  }

}
