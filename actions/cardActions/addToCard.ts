import { CardAction } from '../../reducers/cardReducer';
import { ADD_TO_CARD } from './actionTypes';

export const addToCardAction = (product: any): CardAction => ({
  type: ADD_TO_CARD,
  payload: product,
});

export const addToCard = (product: any): CardAction => {
  const action = addToCardAction(product);
  return action;
};
