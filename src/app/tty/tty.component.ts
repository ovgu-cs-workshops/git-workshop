import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'tty',
  templateUrl: './tty.component.html',
  styleUrls: ['./tty.component.scss']
})
export class TtyComponent implements OnInit {
  @Input('port') public port: string;

  public url: SafeResourceUrl;
  public loaded: boolean = false;

  constructor(private _sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.url = this._sanitizer.bypassSecurityTrustResourceUrl(
      '//' + location.hostname + ':' + (this.port || "8000") + '/terminal/slides'
    );

    setTimeout(() => {
      this.loaded = true;
    }, 1000);
  }
}
