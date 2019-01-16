import {Action} from '@ngrx/store';
import {ICategory, IPayment} from '../reducers/data.reducer';
import {ICurrency} from '../../modules/dashboard/dashboard.component';

export const LOAD_CATEGORIES = '[DATA] Load Categories';
export const LOAD_CATEGORIES_SUCCESS = '[DATA] Load Categories Success';
export const LOAD_PAYMENTS = '[Data] Load Payments';
export const LOAD_PAYMENTS_SUCCESS = '[Data] Load Payments Success';
export const LOAD_CURRENCY_EXCHANGE = '[DATA] Load Currency Exchange';
export const LOAD_CURRENCY_EXCHANGE_SUCCESS = '[DATA] Load Currency Exchange Success';

export const ADD_CATEGORY = '[DATA] Add Category';
export const ADD_CATEGORY_SUCCESS = '[DATA] Add Category Success';
export const SELECT_CATEGORY = '[DATA] Select Category';
export const PAYMENT_TO_SELECTED_CATEGORY = '[DATA] Payment To Selected Category';
export const PAYMENT_TO_SELECTED_CATEGORY_SUCCESS = '[DATA] Payment To Selected Category Success';


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

  readonly payload: {payments: any[]};

  constructor(payments) {
    this.payload = {payments};
  }
}


export class AddCategory implements Action {
  readonly type = ADD_CATEGORY;
  readonly payload: {name: string, percent: number, description: string};

  constructor(name, percent, description) {
    this.payload = {name, percent, description};
  }
}

export class AddCategorySuccess implements Action {
  readonly type = ADD_CATEGORY_SUCCESS;
  readonly payload: {category: ICategory};

  constructor(category) {
    this.payload = {category};
  }
}

export class SelectCategory implements Action {
  readonly type = SELECT_CATEGORY;
  readonly payload: {categoryId: string};

  constructor(categoryId) {
    this.payload = {categoryId};
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
