import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit {
  isLogginMode = true;
  constructor(private authService: AuthService) {}

  ngOnInit() {}

  onSwitchMode() {
    this.isLogginMode = !this.isLogginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;
    form.reset();
    if (this.isLogginMode) {
      // ...
    } else {
      this.authService.signup(email, password).subscribe({
        next(response) {
          console.log(response, 'Response');
        },
        error(err) {
          console.log(err, 'Erorr');
        },
      });
    }
    form.reset();
  }
}
