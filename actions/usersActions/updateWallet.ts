import { Users, UsersAction } from '../../reducers/usersReducer';
import { UPDATE_WALLET } from './actionTypes';

export const updateWalletAction = (
  user: Users,
  newWallet: number,
): UsersAction => ({
  type: UPDATE_WALLET,
  payload: { login: user.login, wallet: newWallet },
});

export const updateWallet = (user: Users, wallet: number) => {
  const action = updateWalletAction(user, wallet);
  return action;
};
