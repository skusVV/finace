import {ActionReducer} from '@ngrx/store/src/models';
import {Action} from '@ngrx/store';

interface IActionReducerMap<T> {
  [action: string]: ActionReducer<T, Action>;
}

export function createReducer<T>(map: IActionReducerMap<T>, initialState: T): ActionReducer<T> {
  return (state = initialState, action) => {
    if (action.type in map) {
      return map[action.type](state, action);
    }

    return state;
  };
}
