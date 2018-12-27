import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {LOGIN_USER, LoginUser, LoginUserFail, LoginUserSuccess, USER_SET} from '../../reducers/user/user.actions';
import {map, catchError, switchMap, tap, filter} from 'rxjs/operators';
import {of} from 'rxjs';
import {RedirectTo} from '../../reducers/router/router.actions';
import {Store} from '@ngrx/store';
import {IState} from '../../reducers';

@Injectable()
export class UserEffect {
  @Effect() loginUserStream: Observable<LoginUserSuccess | LoginUserFail>;
  @Effect({dispatch: false}) loginUserSuccessStream;
  @Effect({dispatch: false}) loginUserFailStream;

  constructor(private http: HttpClient, private actionsStream: Actions, private store: Store<IState>) {
    this.loginUserStream = actionsStream.pipe(
      ofType<LoginUser>(LOGIN_USER),
      switchMap(({payload: {userName, password}}) =>
        http.post<any>(`/api/v1/user/auth`, {userName, password}).pipe(
          map(({body: {userName, auth}}) => new LoginUserSuccess(userName, auth)),
          //TODO change LoginUserSuccess to LoginUserFail
          catchError(() => of(new LoginUserFail( false))),
        ),
      ),
    );

    this.loginUserSuccessStream = actionsStream.pipe(
      ofType<LoginUserSuccess>(USER_SET),
      // if LoginUserSuccess always true then we do not need filter here anymore
      filter(({payload})=> !!payload.auth),
      tap(() => {
        this.store.dispatch(new RedirectTo(['/dashboard']));
      }),
    );

    this.loginUserFailStream = actionsStream.pipe(
      ofType<LoginUserFail>(USER_SET),
      // if LoginUserSuccess always true then we do not need filter here anymore
      filter(({payload})=> !payload.auth),
      tap(() => {
        console.log('errror')
      }),
    );
  }
}
