import { Component, OnInit, QueryList, ContentChildren, AfterViewInit, ChangeDetectorRef } from '@angular/core';

import { SlideComponent } from '../slide/slide.component';

@Component({
  selector: 'chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.scss']
})
export class ChapterComponent implements OnInit, AfterViewInit {
  @ContentChildren(SlideComponent) private slides: QueryList<SlideComponent>;

  public order = 0;
  public chapter = 0;

  constructor(private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit() {
  }

  change() {
    this.changeDetector.detectChanges();
  }

  ngAfterViewInit() {
    this.slides.forEach((slide) => {
      if (this.chapter % 2 === 0) {
        slide.order = ++this.order;
      } else {
        slide.order = this.order--;
      }
      slide.chapter = this.chapter;
      slide.change();
    });
    this.changeDetector.detectChanges();
  }

}
