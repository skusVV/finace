// import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {IState} from '../../reducers/index';
// import {Observable} from 'rxjs';
// import {LOGIN_USER, LoginUser, LoginUserSuccess} from '../../reducers/user/user.actions';
import {map, catchError, switchMap, tap} from 'rxjs/operators';
// import { of } from 'rxjs';
import {ROUTER_REDIRECT_TO, RedirectTo} from '../../reducers/router/router.actions'

@Injectable()
export class RouterEffects {
  @Effect({dispatch: false}) redirectToStream;


  constructor(private actionsStream: Actions,
              private store: Store<IState>,
              private router: Router) {
    this.redirectToStream = actionsStream.pipe(
      ofType<RedirectTo>(ROUTER_REDIRECT_TO),
      tap(({payload: {path, extras}}) => {
        router.navigate(path, extras).then();
      }),
    );
  }
}
