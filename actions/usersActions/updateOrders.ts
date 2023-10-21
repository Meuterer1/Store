import { OrdersHistory, Users } from '../../reducers/usersReducer';
import { UPDATE_ORDERS } from './actionTypes';

export const updateOrdersAction = (user: Users, order: OrdersHistory[]) => ({
  type: UPDATE_ORDERS as typeof UPDATE_ORDERS,
  payload: { user: user, order: order },
});

export const updateOrders = (user: Users, order: OrdersHistory[]) => {
  const action = updateOrdersAction(user, order);
  return action;
};
