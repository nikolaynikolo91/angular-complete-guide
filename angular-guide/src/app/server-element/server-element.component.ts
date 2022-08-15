import { Component, Input, OnInit } from '@angular/core';

export type ServerType = { name: string; type: string; content: string };

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.scss'],
})
export class ServerElementComponent implements OnInit {
  @Input('srvElement') element: ServerType;

  constructor() {}

  ngOnInit(): void {}
}
