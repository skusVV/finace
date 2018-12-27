import {createReducer} from '../../utils';
import {USER_SET, USER_CLEAR} from './user.actions'

export interface IUserState {
  userName: string;
  auth: boolean;
}

const initialState = {
  userName: null,
  auth: false,
};

const clearReducer = (): IUserState => initialState;

// TODO replace any with action
const changeReducer = (state: IUserState, {payload:  {userName = null, auth = false}}: any): IUserState => ({
  ...initialState,
  userName,
  auth
});

export const userReducer = createReducer({
  [USER_SET]: changeReducer,
  [USER_CLEAR]: clearReducer,
}, initialState);

