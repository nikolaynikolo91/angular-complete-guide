import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [
          Validators.required,
          this.checkForbiddenNames.bind(this),
        ]),
        email: new FormControl(
          null,
          [Validators.required, Validators.email],
          [this.forbiddenEmails]
        ),
      }),
      gender: new FormControl('male'),
      hobbies: new FormArray([new FormControl(null, Validators.required)]),
    });
    this.signupForm.valueChanges.subscribe((value) => console.log(value));
    this.signupForm.statusChanges.subscribe((status) => console.log(status));
  }

  onSubmit() {
    console.log(this.signupForm.value);
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  get hobbiesControls() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  checkForbiddenNames(control: FormControl): {
    [errorMessageValidator: string]: boolean;
  } {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return { nameIsForbidden: true };
    } else null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ emailIsForbidden: true });
        }
      }, 1500);
    });

    return promise;
  }
}
