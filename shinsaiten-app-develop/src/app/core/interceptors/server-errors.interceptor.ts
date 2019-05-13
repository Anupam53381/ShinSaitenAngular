import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class ServerErrorsInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // If the call fails, retry until 5 times before throwing an error
    return next.handle(request); // .retry(5);
  }

}

@Injectable()
export class ShinsaitenHTTPTokenInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      let authReq = request;
      if (localStorage.getItem('SecurityToken') != null) {
        authReq = request.clone( {headers: new HttpHeaders().set(TOKEN_HEADER_KEY, localStorage.getItem('SecurityToken'))});
      }
    return next.handle(authReq);
  }

}