import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

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

  onSubmit(form:NgForm){
    console.log(form.value)
  }
}
