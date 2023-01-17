import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';

const API_KEY = 'AIzaSyDKk_QQL8MmKqZbSePc9r0sSatToO6ABa0';
const BASE_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:';
const SIGNUP_URL = 'signUp?key=';
const SIGNIN_URL = 'signInWithPassword?key=';

const ERROR_MESSAGES: { [key: string]: string } = {
  EMAIL_EXISTS: 'This email exist already',
  EMAIL_NOT_FOUND: 'This email does not exist.',
  INVALID_PASSWORD: 'This password is not correct.',
};

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);
  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(BASE_URL + SIGNUP_URL + API_KEY, {
        email,
        password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap(({ email, expiresIn, idToken, localId }) =>
          this.handleAuthentiocation(email, localId, idToken, +expiresIn)
        )
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(BASE_URL + SIGNIN_URL + API_KEY, {
        email,
        password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap(({ email, expiresIn, idToken, localId }) =>
          this.handleAuthentiocation(email, localId, idToken, +expiresIn)
        )
      );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
  }

  autoLogin() {
    const userData: {
      email: string;
      userid: string;
      _token: string;
      _expirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.userid,
      userData._token,
      new Date(userData._expirationDate)
    );

    if (loadedUser.token){
      this.user.next(loadedUser)
    }
  }

  private handleError({ error }: HttpErrorResponse) {
    const message = ERROR_MESSAGES[error.error.message];
    if (message) {
      return throwError(() => new Error(message));
    } else return throwError(() => new Error('An unkown error occurd!'));
  }

  private handleAuthentiocation(
    email: string,
    userid: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, userid, token, expirationDate);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }
}
