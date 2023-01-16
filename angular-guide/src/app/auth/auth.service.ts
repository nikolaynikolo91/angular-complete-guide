import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';

const API_KEY = 'AIzaSyDKk_QQL8MmKqZbSePc9r0sSatToO6ABa0';

const ERROR_MESSAGES: { [key: string]: string } = {
  EMAIL_EXISTS: 'This email exist already',
};

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
          API_KEY,
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(({ error }) => {
          const message = ERROR_MESSAGES[error.error.message];
          if (message) {
            throw message;
          } else throw 'An unkown error occurd!';
        })
      );
  }
}
