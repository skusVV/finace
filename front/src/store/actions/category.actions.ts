import {Action} from '@ngrx/store';
import {ICategory} from '../reducers/data.reducer';

export const ADD_CATEGORY = '[DATA] Add Category';
export const ADD_CATEGORY_SUCCESS = '[DATA] Add Category Success';
export const SELECT_CATEGORY = '[DATA] Select Category';
export const DELETE_CATEGORY = '[DATA] Delete Category';
export const DELETE_CATEGORY_CANCEL = '[DATA] Delete Category Cancel';
export const DELETE_CATEGORY_SUCCESS = '[DATA] Delete Category Success';

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

export class DeleteCategory implements Action {
  readonly type = DELETE_CATEGORY;
  readonly payload: {categoryId: string};

  constructor(categoryId) {
    this.payload = {categoryId};
  }
}

export class DeleteCategoryCancel implements Action {
  readonly type = DELETE_CATEGORY_CANCEL;
}

export class DeleteCategorySuccess implements Action {
  readonly type = DELETE_CATEGORY_SUCCESS;
  readonly payload: {categoryId: string};

  constructor(categoryId) {
    this.payload = {categoryId};
  }
}
