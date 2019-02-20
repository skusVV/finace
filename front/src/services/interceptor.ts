import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Store, select} from '@ngrx/store';
import {IState, userStateSelector} from '../store/reducers';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private store: Store<IState>) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.indexOf('https') === -1) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.getToken()}`
        }
      });
    }

    return next.handle(request);
  }

  private getToken() {
    let token;
    this.store.pipe(select(userStateSelector)).subscribe(data => token = data.token);
    return token;
  }
}
