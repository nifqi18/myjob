import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { LocalStorageService } from '@app/core';
import { } from '@app/service/login.service';

import 'rxjs/add/operator/catch';

export const AUTH_KEY = 'AUTH';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: LocalStorageService) { }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const _token = this.auth.getItem(AUTH_KEY);
    //console.log(token);
    if (request.url == "http://localhost:3333/api/v1/login") return next.handle(request);
    if (request.url == "http://localhost:3333/api/v1/register") return next.handle(request);

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${_token.Store.token ? _token.Store.token : ''}`
      }
    });


      return next.handle(request).catch(() => {
      const newReq = request.clone();
      return next.handle(newReq);
    });
  } 
}