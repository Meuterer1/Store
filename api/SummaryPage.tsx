import React, { useEffect, useRef, useState } from 'react';
import EmptyCard from '../components/EmptyCard';
import { useAppDispatch, useAppSelector } from '../store/Store';
import ViewCart from './ViewCart';

import { removeFromCardAction } from '../actions/cardActions/removeFromCard';
import './styles/Summary.scss';

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

  let sums = cardItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  let delivery = deliveryCost - deliveryPromo;

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
        <div className="payment_summary">
          <div className="payment_summary_details">
            <h3>Twoje zamówienie</h3>
            <ViewCart cardItems={showCardItems} showButtons={false} />
            <div className="payment_summary_details_item">
              <h4>Suma: </h4>
              <p>$ {sums.toFixed(2)}</p>
            </div>
            <div className="payment_summary_details_item">
              <h4>Dostawa: </h4>
              <p>$ {delivery.toFixed(2)}</p>
            </div>
            <div className="payment_summary_details_item">
              <h4>Kod rabatowy: </h4>
              <p>- {isPromoActive ? promoDiscount : '$ 0,00'}</p>
            </div>
            <div className="payment_summary_details_item">
              <h3>Podsumowanie:</h3>
              <p>$ {subtotal.toFixed(2)}</p>
            </div>
          </div>
          <div className="payment">
            <div className="payment_delivery">
              <h3>Szczegóły dostawy</h3>
              <div className="payment_delivery_item">
                <h4>Adres dostawy: </h4>
                <p>ul. Grunwaldzka 10, 10-115 Wrocław</p>
              </div>
              <div className="payment_delivery_item">
                <h4>Przewidywany czas dostawy: </h4>
                <p>2 dni robocze</p>
              </div>
              <div className="payment_delivery_item">
                <h4>Wybrany sposób dostawy: </h4>
                <p>Kurier</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <EmptyCard />
      )}
    </>
  );
};

export default SummaryPage;
