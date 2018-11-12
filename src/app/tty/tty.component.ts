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
  private terminalElement: ElementRef;
  private terminal: Terminal;

  constructor(private _backend: BackendService) {
    this.terminal = new Terminal();
  }

  ngAfterViewInit() {
    this.terminal.open(this.terminalElement.nativeElement);
    (this.terminal as any).fit();
    this.terminal.clear();
    this.terminal.writeln('Connecting...');
    this._backend.createConsole(this.terminal.cols, this.terminal.rows).then(result => {
      this.terminal.clear();
      this.terminal.on('data', data => {
        result.sendInput(data);
      });
      const sub = result.output.subscribe((out) => {
        this.terminal.write(out);
      });
      result.onClose().then(() => {
        sub.unsubscribe();
        this.terminal.clear();
        this.terminal.writeln('Disconnected from server');
      });
    }, err => {
      this.terminal.clear();
      this.terminal.writeln('Failed to connect to server!');
      console.log('createconsole', err);
    });
  }
}
