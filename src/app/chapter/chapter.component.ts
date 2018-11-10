import { Component, OnInit, QueryList, ContentChildren, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { SlideComponent } from '../slide/slide.component';

@Component({
  selector: 'chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.scss']
})
export class ChapterComponent implements OnInit, AfterViewInit {
  @ContentChildren(SlideComponent) private slides: QueryList<SlideComponent>;

  public order = 0;
  public prevOrder = 0;
  public prevOrderSubject = new BehaviorSubject<number>(0);
  public chapter = 0;
  public chapterSubject = new BehaviorSubject<number>(0);

  constructor(private changeDetector: ChangeDetectorRef) {
    this.chapterSubject.subscribe(v => {
      this.chapter = v;
    });
    this.prevOrderSubject.subscribe(v => {
      this.prevOrder = v;
    });
  }

  ngOnInit() {
  }

  change() {
    this.changeDetector.detectChanges();
  }

  ngAfterViewInit() {
    this.slides.forEach((slide) => {
      slide.subscribe(this.prevOrderSubject, this.chapterSubject);
      slide.order = this.order++;
    });
    this.order--;
  }

}
