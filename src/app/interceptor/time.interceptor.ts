import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContext,
  HttpContextToken,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const CHECK_TIME = new HttpContextToken<boolean>(() => false);

export function context_interceptor() {
  console.log("context_interceptor");

  return new HttpContext().set(CHECK_TIME, true);
}

@Injectable()
export class TimeInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.context.get(CHECK_TIME)) {
      const time0 = performance.now();

      return next.handle(request).pipe(
        tap((_) => {
          const time1 = performance.now();
          console.log(`Tiempo de demora: ${time1 - time0}`);
        })
      );
    }
    return next.handle(request);
  }
}
