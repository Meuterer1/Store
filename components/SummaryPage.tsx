import React, { useEffect, useRef, useState } from 'react';

import { removeFromCardAction } from '../actions/cardActions/removeFromCard';
import ViewCart from '../standalones/ViewCart';
import { useAppDispatch, useAppSelector } from '../store/Store';
import { SummarySection } from '../styled_components/SummarySection';
import EmptyCard from './EmptyCard';

const SummaryPage = () => {
  const cardItems = useAppSelector((state) => state.card.card);
  const {
    deliveryCost,
    deliveryPromo,
    promoDiscount,
    subtotal,
    isPromoActive,
  } = useAppSelector((state) => state.card);
  const [showCardItems, setShowCardItems] = useState(cardItems);
  const dispatch = useAppDispatch();
  const isMountedRef = useRef(false);

  const sum = subtotal - deliveryCost + deliveryPromo;

  const delivery = deliveryCost - deliveryPromo;

  useEffect(() => {
    if (!isMountedRef.current) {
      setShowCardItems(cardItems);
      isMountedRef.current = true;
      cardItems.map((item) => dispatch(removeFromCardAction(item.productId)));
    }
  }, [cardItems]);

  return (
    <>
      {subtotal > 0 ? (
        <SummarySection>
          <div className="payment-summary-details">
            <h3 className="header">Your order</h3>
            <ViewCart cardItems={showCardItems} showButtons={false} />
            <div className="single-row">
              <h4>Total: </h4>
              <p>$ {sum.toFixed(2)}</p>
            </div>
            <div className="single-row">
              <h4>Delivery: </h4>
              <p>$ {delivery.toFixed(2)}</p>
            </div>
            {isPromoActive && (
              <div className="single-row">
                <h4>Promo code: </h4>
                <p>- {isPromoActive ? promoDiscount : '$ 0,00'}</p>
              </div>
            )}
            <div className="single-row subtotal">
              <h3>Subtotal:</h3>
              <h3>$ {subtotal.toFixed(2)}</h3>
            </div>
          </div>
          <div className="payment">
            <h3 className="header">Delivery details</h3>
            <div className="single-row">
              <h4>Address: </h4>
              <p>ul. Grunwaldzka 10, 10-115 Wrocław</p>
            </div>
            <div className="single-row">
              <h4>Expected delivery time: </h4>
              <p>2 days</p>
            </div>
            <div className="single-row">
              <h4>Selected delivery method: </h4>
              <p>Delivery man</p>
            </div>
          </div>
        </SummarySection>
      ) : (
        <EmptyCard />
      )}
    </>
  );
};

export default SummaryPage;
