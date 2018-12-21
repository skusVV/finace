import {createReducer} from '../utils';

const TEST_CHANGED = '[TEST] Changed';
const TEST_CLEAR = '[TEST] Clear';

export interface ITestState {
  test: string;
}

const initialState = {
  test: 'lolo'
};

const clearReducer = (state: ITestState): ITestState => ({
  ...initialState,
});

const changeReducer = (state: ITestState,
                       {payload:  {test}}: any): ITestState => ({
  test
});

export const testReducer = createReducer({
  [TEST_CHANGED]: changeReducer,
  [TEST_CLEAR]: clearReducer,
}, initialState);

