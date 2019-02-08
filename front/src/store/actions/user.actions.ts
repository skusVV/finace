import {Action} from '@ngrx/store';

export const USER_LOGIN = '[USER] Login';
export const USER_LOGIN_SUCCESS = '[USER] Login Success';
export const USER_LOGIN_FAIL = '[USER] Login Fail';
export const USER_REGISTER = '[USER] Register';
export const USER_SET = '[USER] SET';
export const USER_LOGOUT = '[USER] Logout';
export const USER_LOGOUT_SUCCESS = '[USER] Logout Success';

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
  readonly type = USER_LOGIN_SUCCESS;
  readonly payload: {userName: string, mail: string, token: string, auth: boolean};

  constructor(userName, mail, token) {
    this.payload = {userName, mail, token, auth: true};
  }
}

export class LoginUserFail implements Action {
  readonly type = USER_LOGIN_FAIL;
  readonly payload: {error: string};

  constructor(error) {
    this.payload = {error};
  }
}

export class LogoutUser implements Action {
  readonly type = USER_LOGOUT;
}

export class LogoutUserSucess implements Action {
  readonly type = USER_LOGOUT_SUCCESS;
}
