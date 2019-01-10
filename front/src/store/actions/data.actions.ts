import {Action} from '@ngrx/store';
import {ICategory, IPayment} from '../reducers/data.reducer';

export const DATA_LOADED_SUCCESS = '[DATA] Loaded Success';
export const LOAD_CATEGORIES = '[DATA] Load Categories';
export const LOAD_CATEGORIES_SUCCESS = '[DATA] Load Categories Success';
export const ADD_CATEGORY = '[DATA] Add Category';
export const ADD_CATEGORY_SUCCESS = '[DATA] Add Category Success';


export class DataLoadedSuccess implements Action {
  readonly type = DATA_LOADED_SUCCESS;
  readonly payload: {payments: IPayment[], categories: ICategory[]};

  constructor(payments, categories) {
    this.payload = {payments, categories};
  }
}

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

