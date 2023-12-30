// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor,
// } from '@angular/common/http';
// import { take, exhaustMap } from 'rxjs/operators';
// import { Observable } from 'rxjs';
// import { AuthService } from '../services/auth.service';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   constructor(private authService: AuthService) {}

//   intercept(
//     request: HttpRequest<unknown>,
//     next: HttpHandler
//   ): Observable<HttpEvent<unknown>> {
//     return this.authService.user.pipe(
//       take(1),
//       exhaustMap((user) => {
//         if (!user) {
//           return next.handle(request);
//         }
//         const modifiedReq = request.clone({
//           params: new HttpParams().set('auth', user.token ? user.token : ''),
//         });
//         return next.handle(modifiedReq);
//       })
//     );
//   }
// }
