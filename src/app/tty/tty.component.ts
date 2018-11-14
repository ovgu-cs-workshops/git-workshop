import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { Terminal } from 'xterm';

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
    this._terminal = new Terminal();
  }

  ngAfterViewInit() {
    this._terminal.open(this._terminalElement.nativeElement);
    (this._terminal as any).fit();
    this._terminal.clear();
    this._terminal.writeln('Connecting...');
    this._backend.createConsole(this._terminal.cols, this._terminal.rows).then(result => {
      this._terminal.clear();
      this._terminal.on('data', data => {
        result.sendInput(data);
      });
      const sub = result.output.subscribe((out) => {
        this._terminal.write(out);
      });
      result.onClose().then(() => {
        sub.unsubscribe();
        this._terminal.clear();
        this._terminal.writeln('Disconnected from server');
      });
    }, err => {
      this._terminal.clear();
      this._terminal.writeln('Failed to connect to server!');
      console.log('createconsole', err);
    });
  }
}
