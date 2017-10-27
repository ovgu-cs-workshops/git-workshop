import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SlidesComponent } from './slides/slides.component';
import { SlideTitleComponent } from './slide-title/slide-title.component';
import { SlideComponent } from './slide/slide.component';

import { DateService } from './services/date.service';
import { TtyComponent } from './tty/tty.component';
import { SlideTtyComponent } from './slide-tty/slide-tty.component';
import { SlideInitComponent } from './slide-init/slide-init.component';
import { SlideReadmeComponent } from './slide-readme/slide-readme.component';
import { SlideCommitComponent } from './slide-commit/slide-commit.component';
import { SlideConfigComponent } from './slide-config/slide-config.component';
import { SlideCommitExampleComponent } from './slide-commit-example/slide-commit-example.component';

@NgModule({
  declarations: [
    AppComponent,
    SlidesComponent,
    SlideTitleComponent,
    SlideComponent,
    TtyComponent,
    SlideTtyComponent,
    SlideInitComponent,
    SlideReadmeComponent,
    SlideCommitComponent,
    SlideConfigComponent,
    SlideCommitExampleComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [DateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
