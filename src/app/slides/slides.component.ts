import { Component, OnInit, QueryList, ViewChildren, AfterViewInit, ChangeDetectorRef } from '@angular/core';

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
      arr[pos].chapter = this.chapter++;
      if (arr[pos - 1]) {
        arr[pos].order = arr[pos - 1].order;
      } else {
        arr[pos].order = 0;
      }
    }
    this.chapters.forEach((chapter) => {
      console.log(chapter.chapter);
      console.log(chapter.order);
      chapter.change();
    });
    this.changeDetector.detectChanges();
  }

}
