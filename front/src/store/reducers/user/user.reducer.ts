import {createReducer} from '../../utils';
import {USER_SET, USER_CLEAR} from './user.actions'

export interface IUserState {
  userName: string;
  auth: boolean;
  mail: string;
  token: string;
}

const initialState = {
  userName: null,
  auth: false,
  mail: null,
  token: null,
};

const clearReducer = (): IUserState => initialState;

// TODO replace any with action
const changeReducer = (state: IUserState, {payload:  {userName = null, mail = null, token = null, auth = false}}: any): IUserState => ({
  ...initialState,
  userName,
  auth,
  mail,
  token
});

export const userReducer = createReducer({
  [USER_SET]: changeReducer,
  [USER_CLEAR]: clearReducer,
}, initialState);

