import { Card, CardAction } from '../../reducers/cardReducer';
import { UPDATE_QUANTITY } from './actionTypes';

export const updateQuantityAction = (
  card: Card,
  newQuantity: number,
): CardAction => ({
  type: UPDATE_QUANTITY,
  payload: { productId: card.productId, quantity: newQuantity },
});

export const updateQuantity = (card: Card, newQuantity: number): CardAction => {
  card.quantity = newQuantity;
  const action = updateQuantityAction(card, newQuantity);
  return action;
};
