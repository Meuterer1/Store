export const ADD_TO_CARD = 'ADD_TO_CARD';
export const REMOVE_FROM_CARD = 'REMOVE_FROM_CARD';
export const SET_PROMO_ACTIVE = 'SET_PROMO_ACTIVE';
export const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
export const UPDATE_SUBTOTAL = 'UPDATE_SUBTOTAL';

export type CardTypes =
  | typeof ADD_TO_CARD
  | typeof REMOVE_FROM_CARD
  | typeof SET_PROMO_ACTIVE
  | typeof UPDATE_QUANTITY
  | typeof UPDATE_SUBTOTAL;
