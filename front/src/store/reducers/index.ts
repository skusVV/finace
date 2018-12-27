import {InjectionToken} from '@angular/core';
import {ActionReducer, ActionReducerMap, createFeatureSelector, MetaReducer} from '@ngrx/store';
import {storeFreeze} from 'ngrx-store-freeze';
import {storeLogger} from 'ngrx-store-logger';
import {environment} from '../../environments/environment';
import {IUserState, userReducer} from './user/user.reducer';

export function logger(reducer: ActionReducer<IState>): any {
  return storeLogger()(reducer);
}
export interface IState {
  user: IUserState;
}

export const reducers: ActionReducerMap<IState> = {
  user: userReducer,
};

export const reducerToken = new InjectionToken<ActionReducerMap<IState>>('reducers');
export const reducerProvider = [
  {provide: reducerToken, useValue: reducers},
];


export const metaReducers: MetaReducer<IState>[] = environment.production
  ? []
  : [logger, storeFreeze];

export const userStateSelector = createFeatureSelector<IUserState>('user');
