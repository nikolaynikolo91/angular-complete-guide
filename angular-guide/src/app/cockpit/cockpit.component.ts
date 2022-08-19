import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { EventData } from '../app.component';
@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.scss'],
})
export class CockpitComponent implements OnInit {
 @Output() serverCreated = new EventEmitter<EventData>();
 @Output('bpCreated') blueprintCreated = new EventEmitter<EventData>();
  // newServerName = '';
  // newServerContent = '';
 @ViewChild('serverContent') serverContent: ElementRef;

  

  constructor() {}

  ngOnInit(): void {}

  onAddServer(nameInput: HTMLInputElement) {
    this.serverCreated.emit({
      serverContent: this.serverContent.nativeElement.value,
      serverName: nameInput.value,
    });
  }

  onAddBlueprint(nameInput: HTMLInputElement) {
    this.blueprintCreated.emit({
      serverContent: this.serverContent.nativeElement.value,
      serverName: nameInput.value,
    });
  }
}
