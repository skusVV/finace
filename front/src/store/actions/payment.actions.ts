import {Action} from '@ngrx/store';
import {IPayment} from '../reducers/data.reducer';
import {ICurrency} from '../../constants';

export const SELECT_PAYMENT = '[PAYMENT] Select Payment';

export const DELETE_PAYMENT = '[PAYMENT] Delete Payment';
export const DELETE_PAYMENT_CANCEL = '[PAYMENT] Delete Payment Cancel';
export const DELETE_PAYMENT_SUCCESS = '[PAYMENT] Delete Payment Success';

export const PAYMENT_TO_SELECTED_CATEGORY = '[PAYMENT] Payment To Selected Category';
export const PAYMENT_TO_SELECTED_CATEGORY_SUCCESS = '[PAYMENT] Payment To Selected Category Success';

export const UPDATE_PAYMENT = '[PAYMENT] Update Payment';
export const UPDATE_PAYMENT_SUCCESS = '[PAYMENT] Update Payment Success';

export class SelectPayment implements Action {
  readonly type = SELECT_PAYMENT;
  readonly payload: {selectedPayment: IPayment};

  constructor(selectedPayment) {
    this.payload = {selectedPayment};
  }
}

export class DeletePayment implements Action {
  readonly type = DELETE_PAYMENT;
  readonly payload: {paymentId: string};

  constructor(paymentId) {
    this.payload = {paymentId};
  }
}

export class DeletePaymentCancel implements Action {
  readonly type = DELETE_PAYMENT_CANCEL;
}

export class DeletePaymentSuccess implements Action {
  readonly type = DELETE_PAYMENT_SUCCESS;
  readonly payload: {paymentId: string};

  constructor(paymentId) {
    this.payload = {paymentId};
  }
}

export class PaymentToSelectedCategory implements Action {
  readonly type = PAYMENT_TO_SELECTED_CATEGORY;
  readonly payload: {categoryId: string, amount: number, currency: ICurrency, description: string};

  constructor(categoryId, amount, currency, description) {
    this.payload = {categoryId, amount, currency, description};
  }
}

export class PaymentToSelectedCategorySuccess implements Action {
  readonly type = PAYMENT_TO_SELECTED_CATEGORY_SUCCESS;
  readonly payload: {payment};

  constructor(payment) {
    this.payload = {payment};
  }
}

export class UpdatePayment implements Action {
  readonly type = UPDATE_PAYMENT;
  readonly payload: IPayment;

  constructor(payment: IPayment) {
    this.payload = payment;
  }
}

export class UpdatePaymentSucess implements Action {
  readonly type = UPDATE_PAYMENT_SUCCESS;
  readonly payload: IPayment;

  constructor(payment) {
    this.payload = payment;
  }
}

