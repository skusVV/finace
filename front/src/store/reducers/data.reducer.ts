import {createReducer} from '../utils';
import {
  ADD_CATEGORY_SUCCESS,
  AddCategorySuccess,
  CategoriesLoadSuccess,

  LOAD_CATEGORIES_SUCCESS, LOAD_CURRENCY_EXCHANGE_SUCCESS,
  LOAD_PAYMENTS_SUCCESS, LoadCurrencyExchangeSuccess,
  PAYMENT_TO_SELECTED_CATEGORY_SUCCESS, PaymentsLoadSuccess,
  PaymentToSelectedCategorySuccess,
  SELECT_CATEGORY, SELECT_PAYMENT,
  SelectCategory, SelectPayment
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

export interface ICurrencyExchange {
  currencyName: string;
  rate: number;
}

export interface IDataState {
  payments: IPayment[];
  categories: ICategory[];
  selectedCategory: ICategory;
  selectedPayment: IPayment;
  currencyExchange: ICurrencyExchange[];
}

const initialState = {
  payments: [],
  categories: [],
  selectedCategory: null,
  selectedPayment: null,
  currencyExchange: [],
};

const setCategories = (state: IDataState, {payload:  {categories = []}}: CategoriesLoadSuccess): IDataState => ({
  ...state,
  categories
});

const setPayments = (state: IDataState, {payload:  {payments = []}}: PaymentsLoadSuccess): IDataState => ({
  ...state,
  payments
});

const addCategory = (state: IDataState, {payload:  {category}}: AddCategorySuccess): IDataState => ({
  ...state,
  categories: [...state.categories, category]
});

const selectCategory = (state: IDataState, {payload:  {categoryId}}: SelectCategory): IDataState => ({
  ...state,
  selectedCategory: state.categories.filter(category => category._id === categoryId)[0],
  selectedPayment: null,
});

const selectPayment = (state: IDataState, {payload:  {selectedPayment}}: SelectPayment): IDataState => ({
  ...state,
  selectedPayment,
});

const addPayment = (state: IDataState, {payload:  {payment}}: PaymentToSelectedCategorySuccess): IDataState => ({
  ...state,
  payments: [...state.payments, payment]
});

const setCurrencyExchange = (state: IDataState, {payload:  {currencyExchange}}: LoadCurrencyExchangeSuccess): IDataState => ({
  ...state,
  currencyExchange: currencyExchange.filter(({cc}) => cc === 'USD' || cc === 'EUR').map(({cc, rate}) => {
    return {
      currencyName: cc,
      rate
    };
  })
});

export const dataReducer = createReducer({
  [LOAD_CATEGORIES_SUCCESS]: setCategories,
  [ADD_CATEGORY_SUCCESS]: addCategory,
  [SELECT_CATEGORY]: selectCategory,
  [PAYMENT_TO_SELECTED_CATEGORY_SUCCESS]: addPayment,
  [LOAD_PAYMENTS_SUCCESS]: setPayments,
  [LOAD_CURRENCY_EXCHANGE_SUCCESS]: setCurrencyExchange,
  [SELECT_PAYMENT]: selectPayment
}, initialState);
