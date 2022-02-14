import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../service/token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    request = this.addAuthorization(request);
    console.log("Request Interceptado");
    console.log(request);


    return next.handle(request);
  }

  private addAuthorization(request: HttpRequest<unknown>) {
    const token = this.tokenService.getToken();

    if (token) {
      const auth = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`),
      });
      return auth;
    }

    return request;
  }
}
