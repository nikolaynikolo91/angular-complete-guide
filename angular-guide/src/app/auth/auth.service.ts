import { HttpClient, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

const API_KEY = 'AIzaSyDKk_QQL8MmKqZbSePc9r0sSatToO6ABa0';
const SIGNUP_URL =
  'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
const SIGNIN_URL =
  'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';

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
  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(SIGNUP_URL + API_KEY, {
        email,
        password,
        returnSecureToken: true,
      })
      .pipe(catchError(this.handleError));
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(SIGNIN_URL + API_KEY, {
        email,
        password,
        returnSecureToken: true,
      })
      .pipe(catchError(this.handleError));
  }

  private handleError({ error }: HttpErrorResponse) {
    const message = ERROR_MESSAGES[error.error.message];
    if (message) {
      return throwError(() => new Error(message));
    } else return throwError(() => new Error('An unkown error occurd!'));
  }
}
