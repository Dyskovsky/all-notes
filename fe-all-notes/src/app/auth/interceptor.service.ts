import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';


// possible to use https://github.com/auth0/angular2-jwt
// e.g features: throw error if expires

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  constructor(private auth: AuthService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {

    // fitler example
    // if (req.method !== 'POST') {
    //   return next.handle(req);
    // }

    // TODO Add filter for api
    // TODO check if user is logged

    return this.auth.getTokenSilently$().pipe(
      mergeMap(token => {
        const tokenReq = req.clone({
          setHeaders: { Authorization: `Bearer ${token}` },
        });
        return next.handle(tokenReq);
      }),
      catchError(err => throwError(err)),
    );
  }
}
