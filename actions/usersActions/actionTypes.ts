export const ADD_USER = 'ADD_USER';
export const GET_ORDER_DETAILS = 'GET_ORDER_DETAILS';
export const SET_USER_LOGIN_STATUS = 'SET_USER_LOGIN_STATUS';
export const UPDATE_WALLET = 'UPDATE_WALLET';
export const UPDATE_ORDERS = 'UPDATE_ORDERS';
export const ADD_TO_FAVOURITES = 'ADD_TO_FAVOURITES';

export type actionTypes =
  | typeof ADD_USER
  | typeof GET_ORDER_DETAILS
  | typeof SET_USER_LOGIN_STATUS
  | typeof UPDATE_WALLET
  | typeof UPDATE_ORDERS
  | typeof ADD_TO_FAVOURITES;
