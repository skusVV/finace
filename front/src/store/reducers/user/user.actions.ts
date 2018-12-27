import {Action} from '@ngrx/store';

export const LOGIN_USER = '[USER] Login';
export const USER_SET = '[USER] SET';
export const USER_CLEAR = '[USER] Clear';

export class LoginUser implements Action {
  readonly type = LOGIN_USER;
  readonly payload: {userName: string, password: string};

  constructor({userName, password}) {
    this.payload = {userName, password};
  }
}

export class LoginUserSuccess implements Action {
  readonly type = USER_SET;
  readonly payload: {userName: string, auth: boolean};

  constructor(userName, auth) {
    this.payload = {userName, auth};
  }
}

export class LoginUserFail implements Action {
  readonly type = USER_SET;
  readonly payload: {auth: boolean};

  constructor(auth) {
    this.payload = {auth};
  }
}
