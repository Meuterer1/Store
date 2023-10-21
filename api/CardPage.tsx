import { faClipboard, faTag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';

import { SetPromoActive } from '../actions/cardActions/setPromoActive';
import { updateSubTotal } from '../actions/cardActions/subTotal';
import { useAppDispatch, useAppSelector } from '../store/Store';
import Payment from './Payment';
import ViewCart from './ViewCart';

import './styles/CardPage.scss';

const CardPage = () => {
  const cardItems = useAppSelector((state) => state.card.card);

  const {
    deliveryCost,
    deliveryPromo,
    promoCode,
    promoDiscount,
    subtotal,
    isPromoActive,
  } = useAppSelector((state) => state.card);
  const [promoInputValue, setPromoInputValue] = useState('');
  const [isPromoCodeActive, setIsPromoCodeActive] = useState(false);
  const [isPaymentActive, setIsPaymentActive] = useState(false);
  const dispatch = useAppDispatch();

  let sums = cardItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const deliveryFinalCost = deliveryCost - deliveryPromo;

  const [orderDetails, setOrderDetails] = useState({
    promoCodeInput: false,
    noteInput: false,
    noteSliderInputValue: '',
  });

  const handleButtonClick = (e: any) => {
    const parsedValue = JSON.parse(e.target.value);
    setOrderDetails({
      ...orderDetails,
      [e.target.name]: !parsedValue,
    });
  };

  const handlePayButton = () => {
    setIsPaymentActive(true);
  };

  const handlePromoInputChange = (e: any) => {
    setPromoInputValue(e.target.value);
  };

  const handlePromoButtonClick = () => {
    if (promoInputValue === promoCode) {
      setIsPromoCodeActive(true);
      dispatch(SetPromoActive(true));
      dispatch(
        updateSubTotal(
          cardItems,
          deliveryCost,
          deliveryPromo,
          isPromoCodeActive ? promoDiscount : 0,
        ),
      );
    }
  };

  const handleNoteInputChange = (e: any) => {
    setOrderDetails({
      ...orderDetails,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    dispatch(
      updateSubTotal(
        cardItems,
        deliveryCost,
        deliveryPromo,
        isPromoCodeActive ? promoDiscount : 0,
      ),
    );

    const handleBeforeUnload = (e: any) => {
      e.preventDefault();
      e.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [cardItems, isPromoCodeActive]);

  return (
    <>
      <div className="cart">
        <div className="order">
          <h4>Zamówienie</h4>
          <ViewCart cardItems={cardItems} showButtons={true} />
          <div className="promos">
            <button
              name="promoCodeInput"
              value={orderDetails.promoCodeInput.toString()}
              onClick={handleButtonClick}
            >
              <span>
                <FontAwesomeIcon icon={faTag} rotation={90} />
              </span>
              Wpisz kod promocyjny
            </button>
            {orderDetails.promoCodeInput ? (
              <div className="promoCodeDetails">
                <input
                  type="text"
                  name="promoCodeSliderInput"
                  placeholder="Wpisz kod rabatowy"
                  onChange={handlePromoInputChange}
                />
                <button onClick={handlePromoButtonClick}>Zatwierdź</button>
              </div>
            ) : (
              ''
            )}
            ;
            <button
              name="noteInput"
              value={orderDetails.noteInput.toString()}
              onClick={handleButtonClick}
            >
              <span>
                <FontAwesomeIcon icon={faClipboard} />
              </span>
              Dodaj notatkę
            </button>
            {orderDetails.noteInput ? (
              <div className="promoCodeDetails">
                <textarea
                  name="noteSliderInputValue"
                  placeholder="Wpisz uwagi do zamówienia"
                  rows={4}
                  cols={10}
                  value={orderDetails.noteSliderInputValue}
                  onChange={handleNoteInputChange}
                />
              </div>
            ) : (
              ''
            )}
            ;
          </div>
        </div>
        <div className="summary">
          <h4>Podsumowanie</h4>
          <div className="summary_details">
            <p>Suma: </p>
            <p>$ {sums.toFixed(2)}</p>
          </div>
          <div className="summary_details promo_code">
            <p>Dostawa</p>
            <p id="delivery_cost">$ {deliveryCost}</p>
            <p>$ {deliveryFinalCost.toFixed(2)}</p>
          </div>
          <div className="summary_details promo_code">
            <p>Kod Promocyjny</p>
            <p>- {isPromoCodeActive ? promoDiscount : 0} %</p>
          </div>
          <div className="summary_details">
            <h3>Podsumowanie </h3>
            <h3>$ {subtotal.toFixed(2)}</h3>
          </div>
          <button onClick={handlePayButton} className="checkout">
            Zapłać
          </button>

          {isPaymentActive && (
            <div className="card_payment">
              <Payment orderValue={subtotal} userNote={orderDetails.noteSliderInputValue}/>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CardPage;
