import {ICategory, IPayment} from '../reducers/data.reducer';
import {Action} from '@ngrx/store';

export const LOAD_CATEGORIES = '[DATA] Load Categories';
export const LOAD_CATEGORIES_SUCCESS = '[DATA] Load Categories Success';
export const LOAD_PAYMENTS = '[Data] Load Payments';
export const LOAD_PAYMENTS_SUCCESS = '[Data] Load Payments Success';
export const LOAD_CURRENCY_EXCHANGE = '[DATA] Load Currency Exchange';
export const LOAD_CURRENCY_EXCHANGE_SUCCESS = '[DATA] Load Currency Exchange Success';


export class LoadCategories implements Action {
  readonly type = LOAD_CATEGORIES;
}

export class CategoriesLoadSuccess implements Action {
  readonly type = LOAD_CATEGORIES_SUCCESS;

  readonly payload: {categories: ICategory[]};

  constructor(categories) {
    this.payload = {categories};
  }
}

export class LoadPayments implements Action {
  readonly type = LOAD_PAYMENTS;
}

export class PaymentsLoadSuccess implements Action {
  readonly type = LOAD_PAYMENTS_SUCCESS;

  readonly payload: {payments: IPayment[]};

  constructor(payments) {
    this.payload = {payments};
  }
}

export class LoadCurrencyExchange implements Action {
  readonly type = LOAD_CURRENCY_EXCHANGE;
}

export class LoadCurrencyExchangeSuccess implements Action {
  readonly type = LOAD_CURRENCY_EXCHANGE_SUCCESS;

  readonly payload: {currencyExchange};

  constructor(currencyExchange) {
    this.payload = {currencyExchange};
  }
}
