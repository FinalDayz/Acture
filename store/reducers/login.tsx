import { SET_LOGIN } from '../actions/login';
import login from '../../models/login';

const initialState = {
  Login: new login(null, null)
};

export default (state = initialState, action: { type: any; login: any; }) => {
  switch (action.type) {
    case SET_LOGIN:
      return {
        Login: action.login
      };
  }

  return state;
};
