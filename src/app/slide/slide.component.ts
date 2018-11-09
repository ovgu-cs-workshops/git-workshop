import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

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
  public totalOrder: number;
  public orderSubject = new BehaviorSubject<number>(0);
  public chapter: number;

  constructor(
    private _dateService: DateService,
    private changeDetector: ChangeDetectorRef,
  ) { }

  subscribe(subOrder, subChapter: BehaviorSubject<number>): void {
    subChapter.subscribe( c => {
      this.chapter = c;
      subOrder.subscribe( o => {
        if (c % 2 !== 0) {
          this.totalOrder = o - this.order;
        } else {
          this.totalOrder = o + this.order;
        }
      });
    });
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
