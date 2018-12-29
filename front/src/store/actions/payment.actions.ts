import {Action} from '@ngrx/store';

export const USER_INITIAL_DATA = '[USER] Initial Data';

export class InitialData implements Action {
  readonly type = USER_INITIAL_DATA;
  readonly payload: {payment: number, categories: any};

  constructor({payment, categories}) {
    this.payload = {payment, categories};
  }
}
