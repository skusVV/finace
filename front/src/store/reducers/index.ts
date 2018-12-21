import {InjectionToken} from '@angular/core';
import {ActionReducer, ActionReducerMap, createFeatureSelector, MetaReducer} from '@ngrx/store';
import {storeFreeze} from 'ngrx-store-freeze';
import {storeLogger} from 'ngrx-store-logger';

export function logger(reducer: ActionReducer<IState>): any {
  return storeLogger()(reducer);
}

import { environment } from '../../environments/environment';
// import * as test from './test.reducer';
import {ITestState, testReducer} from './test.reducer';
export interface IState {
  test: ITestState;
}

export const reducers: ActionReducerMap<IState> = {
  test: testReducer,
};

export const reducerToken = new InjectionToken<ActionReducerMap<IState>>('reducers');
export const reducerProvider = [
  {provide: reducerToken, useValue: reducers},
];


export const metaReducers: MetaReducer<IState>[] = environment.production
  ? []
  : [logger, storeFreeze];

export const testStateSelector = createFeatureSelector<ITestState>('test');
