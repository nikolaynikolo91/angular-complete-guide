import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EventData } from '../app.component';
@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.scss'],
})
export class CockpitComponent implements OnInit {
 @Output() serverCreated = new EventEmitter<EventData>();
 @Output('bpCreated') blueprintCreated = new EventEmitter<EventData>();
  newServerName = '';
  // newServerContent = '';

  constructor() {}

  ngOnInit(): void {}

  onAddServer(nameInput: HTMLInputElement) {
    this.serverCreated.emit({
      serverContent: nameInput.value,
      serverName: this.newServerName,
    });
  }

  onAddBlueprint(nameInput: HTMLInputElement) {
    this.blueprintCreated.emit({
      serverContent: nameInput.value,
      serverName: this.newServerName,
    });
  }
}
