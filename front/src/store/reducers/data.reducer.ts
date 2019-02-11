import {createReducer} from '../utils';
import {
  CategoriesLoadSuccess,
  LOAD_CATEGORIES_SUCCESS,
  LOAD_CURRENCY_EXCHANGE_SUCCESS,
  LOAD_PAYMENTS_SUCCESS,
  LoadCurrencyExchangeSuccess,
  PaymentsLoadSuccess,
} from '../actions/load.actions';
import {
  ADD_CATEGORY_SUCCESS,
  AddCategorySuccess,
  DELETE_CATEGORY_SUCCESS,
  DeleteCategorySuccess,
  SELECT_CATEGORY,
  SelectCategory,
} from '../actions/category.actions';
import {
  DELETE_PAYMENT_SUCCESS,
  DeletePaymentSuccess,
  PAYMENT_TO_SELECTED_CATEGORY_SUCCESS,
  PaymentToSelectedCategorySuccess,
  SELECT_PAYMENT,
  SelectPayment, UPDATE_PAYMENT_SUCCESS, UpdatePaymentSucess
} from '../actions/payment.actions';
import {USER_LOGOUT_SUCCESS} from '../actions/user.actions';

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

const deletePayment = (state: IDataState, {payload:  {paymentId}}: DeletePaymentSuccess): IDataState => ({
  ...state,
  payments: state.payments.filter(({_id})=> _id !== paymentId),
  selectedPayment: null
});

const updatePayment = (state: IDataState, {payload}: UpdatePaymentSucess): IDataState => ({
  ...state,
  payments: state.payments.map(payment => payment._id === payload._id ? payload : payment),
  selectedPayment: payload
});


const deleteCategory = (state: IDataState, {payload:  {categoryId}}: DeleteCategorySuccess): IDataState => ({
  ...state,
  categories: state.categories.filter(({_id})=> _id !== categoryId),
  selectedCategory: null
});

const clearData = (): IDataState => ({
  ...initialState
});

export const dataReducer = createReducer({
  [LOAD_CATEGORIES_SUCCESS]: setCategories,
  [ADD_CATEGORY_SUCCESS]: addCategory,
  [SELECT_CATEGORY]: selectCategory,
  [PAYMENT_TO_SELECTED_CATEGORY_SUCCESS]: addPayment,
  [LOAD_PAYMENTS_SUCCESS]: setPayments,
  [LOAD_CURRENCY_EXCHANGE_SUCCESS]: setCurrencyExchange,
  [SELECT_PAYMENT]: selectPayment,
  [DELETE_PAYMENT_SUCCESS]: deletePayment,
  [DELETE_CATEGORY_SUCCESS]: deleteCategory,
  [USER_LOGOUT_SUCCESS]: clearData,
  [UPDATE_PAYMENT_SUCCESS]: updatePayment
}, initialState);
