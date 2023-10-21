import { CardAction } from '../../reducers/cardReducer';
import { SET_PROMO_ACTIVE } from './actionTypes';

export const SetPromoActiveAction = (isPromoActive: boolean): CardAction => ({
  type: SET_PROMO_ACTIVE,
  payload: isPromoActive,
});

export const SetPromoActive = (isPromoActive: boolean) => {
  return SetPromoActiveAction(isPromoActive);
};
