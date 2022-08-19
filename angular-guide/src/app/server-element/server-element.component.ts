import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';

export type ServerType = { name: string; type: string; content: string };

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.scss'],
  // encapsulation: ViewEncapsulation.None
  encapsulation: ViewEncapsulation.Emulated,
})
export class ServerElementComponent implements OnInit, AfterContentInit {
  @Input('srvElement') element: ServerType;
  @ContentChild('contentParagraph') paragraph: ElementRef;

  constructor() {}
  
  ngAfterContentInit(): void {
    console.log('Text Content of paragraph: ' + this.paragraph.nativeElement.textContent);
  }
  
  ngOnInit(): void {}

}
