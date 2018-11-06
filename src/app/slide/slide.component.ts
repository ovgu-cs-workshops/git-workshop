import { Component, OnInit, Input } from '@angular/core';

import { DateService } from '../services/date.service';

@Component({
  selector: 'slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss']
})
export class SlideComponent implements OnInit {
  @Input('scale') public scale: string;
  @Input('title') public title: string;
  @Input('order') public order: number;

  constructor(private _dateService: DateService) { }

  public ngOnInit(): void {
  }

  public getNumber(): number {
    return this.order;
  }

  public getDate(): string {
    return this._dateService.getDate();
  }
}
