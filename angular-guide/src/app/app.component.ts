import { Component } from '@angular/core';
import { ServerType } from './server-element/server-element.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  
  serverElements: ServerType[] = [{content: 'Just a test!', name: 'TestServer', type: 'server'}];

}
