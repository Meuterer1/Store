import { CardAction } from '../../reducers/cardReducer';
import { REMOVE_FROM_CARD } from './actionTypes';

export const removeFromCardAction = (productID: number): CardAction => ({
  type: REMOVE_FROM_CARD,
  payload: productID,
});

export const removeFromCard = (productID: number): CardAction => {
  const action = removeFromCardAction(productID);
  return action;
};
