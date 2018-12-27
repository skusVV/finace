import {Action} from '@ngrx/store';

export const USER_LOGIN = '[USER] Login';
export const USER_REGISTER = '[USER] Register';
export const USER_SET = '[USER] SET';
export const USER_CLEAR = '[USER] Clear';

export class LoginUser implements Action {
  readonly type = USER_LOGIN;
  readonly payload: {userName: string, password: string};

  constructor({userName, password}) {
    this.payload = {userName, password};
  }
}

export class RegisterUser implements Action {
  readonly type = USER_REGISTER;
  readonly payload: {userName: string, password: string, mail: string, promoCode: string};

  constructor({userName, password, mail, promoCode}) {
    this.payload = {userName, password, mail, promoCode};
  }
}

export class LoginUserSuccess implements Action {
  readonly type = USER_SET;
  readonly payload: {userName: string, mail: string, token: string, auth: boolean};

  constructor(userName, mail, token) {
    this.payload = {userName, mail, token, auth: true};
  }
}

export class LoginUserFail implements Action {
  readonly type = USER_SET;
  readonly payload: {auth: boolean};

  constructor(auth) {
    this.payload = {auth};
  }
}
