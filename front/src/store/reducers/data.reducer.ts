import {createReducer} from '../utils';
import {
  ADD_CATEGORY_SUCCESS, AddCategorySuccess,
  CategoriesLoadSuccess,
  DATA_LOADED_SUCCESS,
  DataLoadedSuccess,
  LOAD_CATEGORIES_SUCCESS
} from '../actions/data.actions';

export interface IPayment {
  id: string;
  date: string;
  amount: number;
  comment: string;
}

export interface ICategory {
  id: string;
  name: string;
  percent: number;
  description: string;
}

export interface IDataState {
  payments: IPayment[];
  categories: ICategory[];
}

const initialState = {
  payments: [],
  categories: []
};

export const setData = (state: IDataState, {payload:  {payments = [], categories = []}}: DataLoadedSuccess): IDataState => ({
  payments,
  categories
});

export const setCategories = (state: IDataState, {payload:  {categories = []}}: CategoriesLoadSuccess): IDataState => ({
  ...state,
  categories
});

export const setCategory = (state: IDataState, {payload:  {category}}: AddCategorySuccess): IDataState => ({
  ...state,
  categories: [...state.categories, category]
});


export const dataReducer = createReducer({
  [DATA_LOADED_SUCCESS]: setData,
  [LOAD_CATEGORIES_SUCCESS]: setCategories,
  [ADD_CATEGORY_SUCCESS]: setCategory
}, initialState);
