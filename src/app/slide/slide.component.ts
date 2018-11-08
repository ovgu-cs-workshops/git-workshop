import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';

import { DateService } from '../services/date.service';


@Component({
  selector: 'slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss']
})
export class SlideComponent implements OnInit {
  @Input('scale') public scale: string;
  @Input('title') public title: string;
  public order: number;
  public chapter: number;

  constructor(
    private _dateService: DateService,
    private changeDetector: ChangeDetectorRef,
  ) { }

  change() {
    this.changeDetector.detectChanges();
  }

  public ngOnInit(): void {
  }

  public getNumber(): number {
    return this.order;
  }

  public getChapter(): number {
    return this.chapter;
  }

  public getDate(): string {
    return this._dateService.getDate();
  }
}
