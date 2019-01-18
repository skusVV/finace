import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {first, map} from 'rxjs/operators';
import {IState} from '../../store/reducers/index';
import {userStateSelector} from '../../store/reducers';
import {RedirectTo} from '../../store/actions/router.actions';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<IState>) {}

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(userStateSelector),
      first(),
      map(({auth}) => auth
        ? true
        : this.redirect())
    );
  }

  private redirect(): false {
    this.store.dispatch(new RedirectTo(['/login']));

    return false;
  }
}
