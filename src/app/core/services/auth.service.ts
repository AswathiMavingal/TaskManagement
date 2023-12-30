import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHandler,
} from '@angular/common/http';
import { throwError, BehaviorSubject, catchError, tap, Observable } from 'rxjs';
import { User } from '../../shared/models/user.model';

export interface AuthResponseData {
  email: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signup({ name, email, password, passwordConfirm }: any): Observable<any> {
    let reqData = { name, email, password, passwordConfirm };
    return this.http
      .post<AuthResponseData>(
        'http://localhost:3000/api/v1/users/signup',
        reqData
      )
      .pipe(
        catchError((err) => {
          console.log(err);
          return err;
        }),
        tap((responseData) => {
          console.log(responseData);
        })
      );
  }

  login({ email, password }: any): Observable<any> {
    return this.http
      .post<AuthResponseData>('http://localhost:3000/api/v1/users/login', {
        email,
        password,
      })
      .pipe(
        catchError(this.handleError) /*(err) => {
          return err.error;
        } didnt work, used throwError from rxjs */,
        tap((responseData) => {
          console.log(responseData);
        })
      );
  }

  handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'Some Error Occured!!!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }

    errorMessage = errorRes.error.message;
    return throwError(errorMessage);
  }
}
