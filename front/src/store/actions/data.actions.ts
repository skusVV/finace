import {Action} from '@ngrx/store';
import {ICategories, IPayment} from '../reducers/data.reducer';

export const DATA_INITIAL = '[DATA] Initial';
export const DATA_LOADED_SUCCESS = '[DATA] Loaded Success';

export const LOAD_CATEGORIES = '[DATA] Load Categories';
export const LOAD_CATEGORIES_SUCCESS = '[DATA] Load Categories Success';

export class InitialData implements Action {
  readonly type = DATA_INITIAL;
  readonly payload: {payment: number, categories: any};

  constructor({payment, categories}) {
    this.payload = {payment, categories};
  }
}

export class DataLoadedSuccess implements Action {
  readonly type = DATA_LOADED_SUCCESS;
  readonly payload: {payments: IPayment[], categories: ICategories[]};

  constructor(payments, categories) {
    this.payload = {payments, categories};
  }
}

export class LoadCategories implements Action {
  readonly type = LOAD_CATEGORIES;
}

export class CategoriesLoadSuccess implements Action {
  readonly type = LOAD_CATEGORIES_SUCCESS;

  readonly payload: {categories: ICategories[]};

  constructor(categories) {
    this.payload = {categories};
  }
}


