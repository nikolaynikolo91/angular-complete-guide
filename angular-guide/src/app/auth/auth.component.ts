import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit {
  isLogginMode = true;
  constructor() {}

  ngOnInit() {}

  onSwitchMode() {
    this.isLogginMode = !this.isLogginMode;
  }
}
