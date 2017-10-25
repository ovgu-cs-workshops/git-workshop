import { Component, OnInit, Input } from '@angular/core';

import { DateService } from '../services/date.service';

@Component({
  selector: 'slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss']
})
export class SlideComponent implements OnInit {
  @Input('x') public x: string;
  @Input('y') public y: string;
  @Input('scale') public scale: string;
  @Input('title') public title: string;

  constructor(private _dateService: DateService) { }

  public ngOnInit(): void {
  }

  public getNumber(): number {
    return 0;
  }

  public getDate(): string {
    return this._dateService.getDate();
  }
}
