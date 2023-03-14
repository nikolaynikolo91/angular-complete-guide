import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';
import { User } from './user.model';

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
  private tokenExpirationTimer: ReturnType<typeof setTimeout>;
  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        BASE_URL + SIGNUP_URL + environment.firebaseAPIKey,
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(({ email, expiresIn, idToken, localId }) =>
          this.handleAuthentiocation(email, localId, idToken, +expiresIn)
        )
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        BASE_URL + SIGNIN_URL + environment.firebaseAPIKey,
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(({ email, expiresIn, idToken, localId }) =>
          this.handleAuthentiocation(email, localId, idToken, +expiresIn)
        )
      );
  }

  logout() {
    this.store.dispatch(new AuthActions.Logout());
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogin() {
    const userData: {
      email: string;
      userid: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.userid,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.store.dispatch(
        new AuthActions.Login({
          email: loadedUser.email,
          token: loadedUser.token,
          userid: loadedUser.id,
          expirationDate: new Date(userData._tokenExpirationDate),
        })
      );
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this, this.logout();
    }, expirationDuration);
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
    this.store.dispatch(
      new AuthActions.Login({ email, token, userid, expirationDate })
    );
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }
}
