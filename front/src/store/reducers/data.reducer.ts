import {createReducer} from '../utils';
import {
  ADD_CATEGORY_SUCCESS,
  AddCategorySuccess,
  CategoriesLoadSuccess,
  DATA_LOADED_SUCCESS,
  DataLoadedSuccess,
  LOAD_CATEGORIES_SUCCESS,
  LOAD_PAYMENTS_SUCCESS,
  PAYMENT_TO_SELECTED_CATEGORY_SUCCESS, PaymentsLoadSuccess,
  PaymentToSelectedCategorySuccess,
  SELECT_CATEGORY,
  SelectCategory
} from '../actions/data.actions';

export interface IPayment {
  _id: string;
  categoryId: string;
  created_date: string;
  amount: number;
  description: string;
  currency: string;
}

export interface ICategory {
  _id: string;
  name: string;
  percent: number;
  description: string;
}

export interface IDataState {
  payments: IPayment[];
  categories: ICategory[];
  selectedCategory: ICategory;
}

const initialState = {
  payments: [],
  categories: [],
  selectedCategory: null
};

export const setData = (state: IDataState, {payload:  {payments = [], categories = []}}: DataLoadedSuccess): IDataState => ({
  payments,
  categories,
  selectedCategory: null
});

export const setCategories = (state: IDataState, {payload:  {categories = []}}: CategoriesLoadSuccess): IDataState => ({
  ...state,
  categories
});

export const setPayments = (state: IDataState, {payload:  {payments = []}}: PaymentsLoadSuccess): IDataState => ({
  ...state,
  payments
});

export const addCategory = (state: IDataState, {payload:  {category}}: AddCategorySuccess): IDataState => ({
  ...state,
  categories: [...state.categories, category]
});

export const selectCategory = (state: IDataState, {payload:  {categoryId}}: SelectCategory): IDataState => ({
  ...state,
  selectedCategory: state.categories.filter(category => category._id === categoryId)[0]
});

export const addPayment = (state: IDataState, {payload:  {payment}}: PaymentToSelectedCategorySuccess): IDataState => ({
  ...state,
  payments: [...state.payments, payment]
});


export const dataReducer = createReducer({
  [DATA_LOADED_SUCCESS]: setData,
  [LOAD_CATEGORIES_SUCCESS]: setCategories,
  [ADD_CATEGORY_SUCCESS]: addCategory,
  [SELECT_CATEGORY]: selectCategory,
  [PAYMENT_TO_SELECTED_CATEGORY_SUCCESS]: addPayment,
  [LOAD_PAYMENTS_SUCCESS]: setPayments
}, initialState);
