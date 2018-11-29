import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { Terminal } from 'xterm';
import * as WebfontLoader from 'xterm-webfont';

Terminal.applyAddon(WebfontLoader)
;
@Component({
  selector: 'tty',
  templateUrl: './tty.component.html',
  styleUrls: ['./tty.component.scss']
})
export class TtyComponent implements AfterViewInit {
  @ViewChild('terminal')
  private _terminalElement: ElementRef;
  private _terminal: Terminal;

  constructor(private _backend: BackendService) {
    this._terminal = new Terminal({
      fontFamily: 'Roboto Mono',
      fontSize: 32,
      cols: 54,
      rows: 10,
    });
  }

  ngAfterViewInit() {
    (this._terminal as any)
      .loadWebfontAndOpen(this._terminalElement.nativeElement)
      .then(terminal => {
        terminal.clear();
        (terminal as any).fit();
        terminal.writeln('Connecting...');

        this._backend.createConsole(this._terminal.cols, this._terminal.rows)
          .then(result => {
            terminal.clear();
            terminal.on('data', data => {
              result.sendInput(data);
            });
            const sub = result.output.subscribe((out) => {
              terminal.write(out);
            });
            result.onClose().then(() => {
              sub.unsubscribe();
              terminal.clear();
              terminal.writeln('Disconnected from server');
            });
          }, err => {
            terminal.clear();
            terminal.writeln('Failed to connect to server!');
            console.log('createconsole', err);
          });
      });
  }
}
