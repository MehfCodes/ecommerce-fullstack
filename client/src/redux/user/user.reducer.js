import { UserActionTypes } from './user.types';

const INITIAL_STATE = {
  isLogin: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.isLogin:
      return {
        ...state,
        isLogin: action.token,
      };
      break;

    default:
      return state;
      break;
  }
};
export default userReducer;
