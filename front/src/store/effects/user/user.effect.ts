import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {
  USER_LOGIN,
  LoginUser,
  LoginUserFail,
  LoginUserSuccess,
  USER_LOGIN_SUCCESS,
  USER_REGISTER,
  RegisterUser, LogoutUser, USER_LOGOUT, LogoutUserSucess,
} from '../../actions/user.actions';
import {map, catchError, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {RedirectTo} from '../../actions/router.actions';
import {Store} from '@ngrx/store';
import {IState} from '../../reducers/index';
import {USER_TOKEN} from '../../reducers/user.reducer';

@Injectable()
export class UserEffect {
  @Effect() loginUserStream: Observable<LoginUserSuccess | LoginUserFail>;
  @Effect() logoutUserStream: Observable<any>;
  @Effect({dispatch: false}) registerUserStream;
  @Effect({dispatch: false}) loginUserSuccessStream;

  constructor(private http: HttpClient, private actionsStream: Actions, private store: Store<IState>) {
    this.loginUserStream = actionsStream.pipe(
      ofType<LoginUser>(USER_LOGIN),
      switchMap(({payload: {userName, password}}) =>
        // TODO should use dto model instead any
        http.post<any>(`/api/v1/user/auth`, {userName, password}).pipe(
          map(({userName, mail, token}) => new LoginUserSuccess(userName, mail, token)),
          catchError(({error}) => of(new LoginUserFail( error.text))),
        ),
      ),
    );

    this.registerUserStream = actionsStream.pipe(
      ofType<RegisterUser>(USER_REGISTER),
      switchMap(({payload: {userName, password, mail, promoCode}}) =>
        // TODO should use dto model instead any
        http.post<any>(`/api/v1/user/register`, {userName, password, mail, promoCode}).pipe(
          tap(() => {
            this.store.dispatch(new RedirectTo(['/login']));
          }),
        ),
      ),
    );

    this.loginUserSuccessStream = actionsStream.pipe(
      ofType<LoginUserSuccess>(USER_LOGIN_SUCCESS),
      tap(({payload: {token}}) => {
        sessionStorage.setItem(USER_TOKEN, token);
        this.store.dispatch(new RedirectTo(['/dashboard']));
      }),
    );

    this.logoutUserStream = actionsStream.pipe(
      ofType<LogoutUser>(USER_LOGOUT),
      switchMap(() => {
          sessionStorage.setItem(USER_TOKEN, '');
          this.store.dispatch(new RedirectTo(['/login']));

          return of(new LogoutUserSucess());
      })
    );
  }
}
