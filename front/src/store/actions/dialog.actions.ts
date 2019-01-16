import {Action} from '@ngrx/store';

export const DIALOG_ADD_NEW_CATEGORY = '[DIALOG] Add New Category';
export const DIALOG_ADD_NEW_PAYMENT = '[DIALOG] Add New Payment';

export class DialogAddNewCategory implements Action {
  readonly type = DIALOG_ADD_NEW_CATEGORY;
}

export class DialogAddNewPayment implements Action {
  readonly type = DIALOG_ADD_NEW_PAYMENT;
}
