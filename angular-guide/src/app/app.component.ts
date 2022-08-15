import { Component } from '@angular/core';
import { ServerType } from './server-element/server-element.component';

export type EventData = {serverName:string, serverContent:string};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  
  serverElements: ServerType[] = [{content: 'Just a test!', name: 'TestServer', type: 'server'}];

  onServerAdded(serverData:EventData ) {
    this.serverElements.push({
      type: 'server',
      content: serverData.serverContent,
      name: serverData.serverName
    });
  }

  onBlueprintAdded(blueprintData: EventData) {
    this.serverElements.push({
      type: 'blueprint',
      name: blueprintData.serverName,
      content: blueprintData.serverContent,
    });
  }
}
