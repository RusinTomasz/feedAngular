import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

import { ActivatedRoute } from '@angular/router';

/* RxJs */
import { map, switchMap, tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface LoginInterface {
  firstName: string;
  lastName: string;
  email: string;
  userId: string;
  token: string;
  role: string;
}

export interface RegisterInterface {
  message: string;
  createdUserName: string;
}

export interface ForgotPasswordInterface {
  email: string;
}

export interface ResetPasswordInterface {
  newPass: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {}

  verifyAccount() {
    return this.activatedRoute.queryParams.pipe(
      map((params) => params['token']),
      switchMap((token) =>
        this.http
          .get(`http://localhost:8080/auth/verify-email?token=${token}`)
          .pipe(catchError(this.handleError))
      )
    );
  }

  resetPassword(newPass: ResetPasswordInterface) {
    const headers = this.createHeaders();

    return this.activatedRoute.queryParams.pipe(
      map((params) => params['resetPassToken']),
      switchMap((resetPassToken) =>
        this.http
          .put(
            `http://localhost:8080/auth/reset-password?resetPassToken=${resetPassToken}`,
            newPass,
            {
              headers: headers,
            }
          )
          .pipe(catchError(this.handleError))
      )
    );
  }

  sendEmailToResetPassword(email: ForgotPasswordInterface) {
    const headers = this.createHeaders();
    return this.http
      .put('http://localhost:8080/auth/forgot-password', email, {
        headers: headers,
      })
      .pipe(catchError(this.handleError));
  }

  signUp(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phoneNumber: string
  ) {
    const userToRegister = {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
    };
    const headers = this.createHeaders();
    return this.http
      .post<RegisterInterface>(
        'http://localhost:8080/auth/signup',
        userToRegister,
        {
          headers: headers,
        }
      )
      .pipe(catchError(this.handleError));
  }

  signIn(email: string, password: string) {
    const userToLogin = {
      email,
      password,
    };

    const headers = this.createHeaders();

    return this.http
      .post<LoginInterface>('http://localhost:8080/auth/login', userToLogin, {
        headers,
      })
      .pipe(
        catchError(this.handleError),
        tap((response) => {
          this.handleAuthentication(
            response.firstName,
            response.lastName,
            response.email,
            response.token,
            response.userId,
            response.role
          );
        })
      );
  }

  private handleAuthentication(
    firstName: string,
    lastName: string,
    email: string,
    token: string,
    userId: string,
    role: string
  ) {
    const user = {
      firstName,
      lastName,
      email,
      token,
      userId,
      role,
    };
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'Wystąpił błąd, proszę spróbować ponownie.';
    if (!errorRes.error.error.message) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'A user with this email could not be found.':
        errorMessage = 'Użytkownik o podanym email nie istnieje.';
        break;
      case 'E-mail address already exist':
        errorMessage = 'Użytkownik o podanym email już istnieje.';
        break;
      case 'Token is invalid. Please contact us for assistance':
        errorMessage = 'Token jest nieprawidłowy. Spróbuj ponownie.';
        break;
      case 'Wrong password!':
        errorMessage = 'Podane hasło jest niepoprawne.';
        break;
      case 'Reset token is invalid. Please contact us for assistance':
        errorMessage = 'Token resetujący hasło jest niepoprawny.';
        break;
    }

    return throwError(errorMessage);
  }

  private createHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/hal+json');
    headers.append('Accept', 'application/json');

    return headers;
  }
}
