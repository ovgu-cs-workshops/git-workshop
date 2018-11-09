import { Component, OnInit, QueryList, ViewChildren, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { SlideComponent } from '../slide/slide.component';
import { ChapterComponent } from '../chapter/chapter.component';

@Component({
  selector: 'slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.scss']
})
export class SlidesComponent implements OnInit, AfterViewInit {
  @ViewChildren(ChapterComponent) private chapters: QueryList<ChapterComponent>;

  private chapter = 0;

  constructor(private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const arr = this.chapters.toArray();
    for (let pos = 0; pos < this.chapters.length; pos++) {
      arr[pos].chapterSubject.next(this.chapter++);
      arr[pos].change();
      if (arr[pos - 1]) {
        if (arr[pos].chapter % 2 === 0) {
          arr[pos].prevOrder = arr[pos - 1].prevOrder - arr[pos - 1].order;
          arr[pos].prevOrderSubject.next(arr[pos].prevOrder);
        } else {
          arr[pos].prevOrder = arr[pos - 1].prevOrder + arr[pos - 1].order;
          arr[pos].prevOrderSubject.next(arr[pos].prevOrder);
        }
      } else {
        arr[pos].prevOrder = 0;
        arr[pos].prevOrderSubject.next(arr[pos].prevOrder);
      }
    }
    this.changeDetector.detectChanges();
  }

}
