import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';

export interface AuthResponseData {
  data: {
    user: {
      name: string;
      email: string;
      role: string;
      id: string;
    };
  };
  token: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  expiration: number = 1;
  user = new BehaviorSubject<User | null>(null);
  tokenExpirationTimer: any;
  constructor(private _http: HttpClient, private _router: Router) {}
  login({ email, password }: any): Observable<any> {
    return this._http
      .post<AuthResponseData>('http://localhost:3000/api/v1/users/login', {
        email,
        password,
      })
      .pipe(
        catchError(this.handleError),
        tap((res) => {
          let user = res.data.user;
          this.handleAuthentication(
            user.name,
            user.email,
            user.role,
            res.token
          );
        })
      );
  }
  signup({ name, email, password, passwordConfirm }: any): Observable<any> {
    return this._http
      .post<AuthResponseData>('http://localhost:3000/api/v1/users/signup', {
        name,
        email,
        password,
        passwordConfirm,
      })
      .pipe(
        catchError(this.handleError),
        tap((res) => {
          let user = res.data.user;
          this.handleAuthentication(
            user.name,
            user.email,
            user.role,
            res.token
          );
        })
      );
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this._router.navigate(['/login']);
    this.user.next(null);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }

  isAuthenticated() {
    return localStorage.getItem('token');
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Something went wrong!!!';
    if (!error.error || !error.error.message) {
      return throwError(errorMessage);
    }
    return throwError(() => new Error(error.error.message));
  }

  private handleAuthentication(
    name: string,
    email: string,
    role: string,
    token: string
  ) {
    let tokenExpirationDate = new Date(
      new Date().getTime() + this.expiration * 1000 * 60 * 24
    );
    let user = new User(
      name,
      email,
      role,
      token,
      tokenExpirationDate.toISOString()
    );
    this.user.next(user);
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    this.autoLogout(this.expiration * 1000 * 60 * 24);
  }
}

// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
// import { User } from 'src/app/shared/models/user.model';

// export interface AuthResponseData {
//   data: {
//     user: {
//       name: string;
//       email: string;
//       role: string;
//       _id?: string;
//     };
//   };
//   token: string;
// }

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   expiration = 1;
//   private tokenExpirationTimer: any;
//   user = new BehaviorSubject<User | null>(null);
//   constructor(private _http: HttpClient, private _router: Router) {}
//   login({ email, password }: any): Observable<any> {
//     return this._http
//       .post<AuthResponseData>('http://localhost:3000/api/v1/users/login', {
//         email,
//         password,
//       })
//       .pipe(
//         catchError(this.handleError),
//         tap((response) => {
//           this.handleAuthentication(
//             response.data.user.name,
//             response.data.user.email,
//             response.token,
//             // response.token,
//             response.data.user.role
//           );
//           console.log(response);
//         })
//       );
//   }

//   signup({ name, email, password, passwordConfirm }: any): Observable<any> {
//     let reqData = { name, email, password, passwordConfirm };
//     return this._http
//       .post<AuthResponseData>(
//         'http://localhost:3000/api/v1/users/signup',
//         reqData
//       )
//       .pipe(
//         catchError(this.handleError),
//         tap((resp) => {
//           console.log(resp);
//         })
//       );
//   }

//   logout() {
//     this.user.next(null);
//     localStorage.removeItem('token');
//     this._router.navigate(['/login']);
//     if (this.tokenExpirationTimer) {
//       clearTimeout(this.tokenExpirationTimer);
//     }
//     this.tokenExpirationTimer = null;
//   }

//   autoLogout(expirationDuration: number) {
//     this.tokenExpirationTimer = setTimeout(() => {
//       this.logout();
//     }, expirationDuration);
//   }

//   handleAuthentication(
//     name: string,
//     email: string,
//     token: string,
//     role: string
//   ) {
//     let tokenExpirationDate = new Date(
//       new Date().getTime() + this.expiration * 1000 * 60 * 24
//     );
//     let user = new User(
//       name,
//       email,
//       role,
//       token,
//       tokenExpirationDate.toISOString()
//     );

//     this.user.next(user);
//     this.autoLogout(this.expiration * 1000 * 60 * 24);
//     localStorage.setItem('token', token);
//   }

//   handleError(errorResponse: HttpErrorResponse) {
//     let errorMessage = 'Something went wrong!!!';
//     if (!errorResponse.error || !errorResponse.error.message) {
//       return throwError(errorMessage);
//     }
//     errorMessage = errorResponse.error.message;
//     return throwError(errorMessage);
//   }
// }
