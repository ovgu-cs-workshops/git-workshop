import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SlidesComponent } from './slides/slides.component';
import { SlideComponent } from './slide/slide.component';

import { DateService } from './services/date.service';
import { TtyComponent } from './tty/tty.component';

@NgModule({
  declarations: [
    AppComponent,
    SlidesComponent,
    SlideComponent,
    TtyComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [DateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
