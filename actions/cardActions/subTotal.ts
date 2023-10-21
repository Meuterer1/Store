import { Card, CardAction } from '../../reducers/cardReducer';
import { UPDATE_SUBTOTAL } from '../cardActions/actionTypes';

export const updateSubTotalAction = (subTotalPromo: number): CardAction => ({
  type: UPDATE_SUBTOTAL,
  payload: subTotalPromo,
});

export const updateSubTotal = (
  card: Card[],
  deliveryCost: number,
  deliveryPromo: number,
  promoDiscount: number = 0,
) => {
  let sums = card.reduce((sum, item) => sum + item.price * item.quantity, 0); // ok
  const deliveryFinalCost = deliveryCost - deliveryPromo; // ok
  const subTotalPromo = sums + deliveryFinalCost - sums * (promoDiscount / 100);

  return updateSubTotalAction(subTotalPromo);
};
