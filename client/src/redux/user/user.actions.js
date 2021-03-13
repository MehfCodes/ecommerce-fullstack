import { UserActionTypes } from './user.types';
export const setCurrentUser = (token) => ({
  type: UserActionTypes.isLogin,
  token,
});
