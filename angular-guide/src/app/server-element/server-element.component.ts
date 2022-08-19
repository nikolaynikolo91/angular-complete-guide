import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

export type ServerType = { name: string; type: string; content: string };

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.scss'],
  // encapsulation: ViewEncapsulation.None
  encapsulation: ViewEncapsulation.Emulated
})
export class ServerElementComponent implements OnInit {
  @Input('srvElement') element: ServerType;

  constructor() {}

  ngOnInit(): void {}
}
