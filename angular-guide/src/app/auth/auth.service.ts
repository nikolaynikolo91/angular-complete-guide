import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_KEY = 'AIzaSyDKk_QQL8MmKqZbSePc9r0sSatToO6ABa0';

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

  signuo(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
        API_KEY,
      {
        email,
        password,
        returnSecureToken: true,
      }
    );
  }
}
