import {createReducer} from '../utils';
// import {IUserState} from './user.reducer';

export const DATA_LOADED_SUCCESS = '[DATA] Loaded Success';

interface IPayment {
  id: string;
  date: string;
  amount: number;
  comment: string;
}

export interface IMonth {
  id: string;
  payments: IPayment[];
}

export interface ICategories {
  id: string;
  name: string;
  percent: number;
  description: string;
}

export interface IDataState {
  months: IMonth[];
  categories: ICategories[];
}

const initialState = {
  months: [],
  categories: []
};

const setData = (state: IDataState, {payload:  {months = [], categories = []}}: any): IDataState => ({
  months,
  categories
});


export const dataReducer = createReducer({
  [DATA_LOADED_SUCCESS]: setData
}, initialState);
