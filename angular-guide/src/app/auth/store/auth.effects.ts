import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as AuthActions from './auth.actions';
import * as AuthService from '../auth.service';
import { AuthResponseData } from '../auth.service';

@Injectable()
export class AuthEffects {
  authLogin = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LOGIN_START),
      switchMap((authData: AuthActions.LoginStart) => {
        return this.http
          .post<AuthResponseData>(
            AuthService.BASE_URL +
              AuthService.SIGNIN_URL +
              environment.firebaseAPIKey,
            {
              email: authData.payload.email,
              password: authData.payload.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            map((resData) => {
              const expirationDate = new Date(
                new Date().getTime() + +resData.expiresIn * 1000
              );
              return new AuthActions.Login({
                email: resData.email,
                expirationDate,
                token: resData.idToken,
                userid: resData.localId,
              });
            })
          );
      })
    )
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
