import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem("jwt")
    if(token){
      request.headers.set("Authorization", "Bearer " + token)
    }
    return next.handle(request).pipe(tap((e: HttpEvent<unknown>)=>{
      if(e instanceof HttpResponse){
        alert("REQUEST: " + e.status)
      }
    }));
  }
}
