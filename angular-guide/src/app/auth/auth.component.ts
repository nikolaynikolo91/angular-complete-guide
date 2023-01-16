import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit {
  isLogginMode = true;
  isLoading = false;
  error: string = null;

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
    this.isLoading = true;

    if (this.isLogginMode) {
      // ...
    } else {
      this.authService.signup(email, password).subscribe({
        next: (response) => {
          console.log(response, 'Response');
          this.isLoading = false;
        },
        error: (err) => {
          console.log(err, 'Erorr');
          this.error = 'An error occurred!'
          this.isLoading = false;
        },
      });
    }
    form.reset();
  }
}
