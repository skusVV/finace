import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {filter, first, map} from 'rxjs/operators';
import {IState} from '../../store/reducers/index'
import {userStateSelector} from '../../store/reducers';
import {RedirectTo} from '../../store/reducers/router/router.actions';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<IState>) {}

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(userStateSelector),
      first(),
      map(({auth}) => auth
        ? true
        // TODO only for development
        : true)
       // : this.redirect())
    )
  }

  private redirect(): false {
    this.store.dispatch(new RedirectTo(['/login']));

    return false;
  }
}
