import { Users, UsersAction } from '../../reducers/usersReducer';
import { SET_USER_LOGIN_STATUS } from '../usersActions/actionTypes';

export const setUserLogInStatusAction = (
  user: Users,
  statusIsLogged: boolean,
): UsersAction => ({
  type: SET_USER_LOGIN_STATUS,
  payload: { login: user.login, isLogged: statusIsLogged },
});

export const setUserLogInStatus = (
  user: Users,
  statusIsLogged: boolean,
): UsersAction => {
  const action = setUserLogInStatusAction(user, statusIsLogged);
  return action;
};
