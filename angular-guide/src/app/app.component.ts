import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('f') onSignUpForm: NgForm;
  defaultQuestion = 'pet';
  answer: string;
  genders = ['male', 'female'];

  suggestUserName() {
    const suggestedName = 'Superuser';
    // this.onSignUpForm.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: '',
    //   },
    //   secret: 'pet',
    //   questionAnswer: '',
    //   gender: 'male',
    // });

    this.onSignUpForm.form.patchValue({
      userData: {
        username: suggestedName,
      },
    });
  }

  onSubmit() {
    console.log(this.onSignUpForm);
  }
}
