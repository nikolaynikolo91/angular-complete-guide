import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EventData } from '../app.component';
@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.scss'],
})
export class CockpitComponent implements OnInit {
 @Output() serverCreated = new EventEmitter<EventData>();
 @Output() blueprintCreated = new EventEmitter<EventData>();
  newServerName = '';
  newServerContent = '';

  constructor() {}

  ngOnInit(): void {}

  onAddServer() {
    this.serverCreated.emit({
      serverContent: this.newServerContent,
      serverName: this.newServerName,
    });
  }

  onAddBlueprint() {
    this.blueprintCreated.emit({
      serverContent: this.newServerContent,
      serverName: this.newServerName,
    });
  }
}
