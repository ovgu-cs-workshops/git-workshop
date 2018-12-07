import { Component, AfterViewInit, HostListener } from '@angular/core';

import 'impress.js';

declare var impress: any;
declare var document: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @HostListener('keydown', ['$event']) onKey(event) {
    event.stopPropagation();
  }
  constructor() {
  }

  public ngAfterViewInit(): void {
    document.body.addEventListener('keydown', () => {
      console.log('foo');
    }, true);
    document.allowSkip = true;
    impress().init();
  }
}
