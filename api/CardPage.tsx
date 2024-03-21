import React, { useEffect, useState } from 'react';

import { SetPromoActive } from '../actions/cardActions/setPromoActive';
import { updateSubTotal } from '../actions/cardActions/subTotal';
import { useAppDispatch, useAppSelector } from '../store/Store';
import Payment from './Payment';

import EmptyCard from '../components/EmptyCard';

import { faClipboard, faTag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../components/Button';
import Cart from '../components/Cart';
import { CardPageSection } from '../components/styled_components/CardPageSection';
import useMessage from '../hooks/useMessage';

import primaryTheme from '../theme/theme';

const CardPage = () => {
  const message = useMessage();
  const cardItems = useAppSelector((state) => state.card.card);

  const { deliveryCost, deliveryPromo, promoCode, promoDiscount, subtotal } =
    useAppSelector((state) => state.card);

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
      message('success', 'Your code is correct');
    } else message('error', 'Your code is not valid');
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

  const cart = useAppSelector((state) => state.card.card);

  return (
    <>
      {cart.length > 0 ? (
        <CardPageSection>
          <h2>Your Cart</h2>
          <div className="cart">
            <Cart />
            <div className="summary">
              <h3>Order Summary</h3>
              <div className="summary-details">
                <p>Subtotal: </p>
                <h4>$ {sums.toFixed(2)}</h4>
              </div>
              <div className="summary-details">
                <p>Delivery</p>
                <h4 id="delivery_cost">$ {deliveryFinalCost.toFixed(2)}</h4>
              </div>
              <div className="summary-details">
                <p>Promo Code</p>
                <h4>- {isPromoCodeActive ? promoDiscount + '%' : ''}</h4>
              </div>
              <div className="summary-details subtotal">
                <p>Total </p>
                <h4>$ {subtotal.toFixed(2)}</h4>
              </div>

              <div className="promos">
                <button
                  className="transparent-button"
                  name="promoCodeInput"
                  value={orderDetails.promoCodeInput.toString()}
                  onClick={handleButtonClick}
                >
                  <span>
                    <FontAwesomeIcon icon={faTag} rotation={90} />
                  </span>
                  Enter Promo Code
                </button>
                {orderDetails.promoCodeInput && (
                  <div className="promo-code-details">
                    <div className="promo-input">
                      <FontAwesomeIcon icon={faTag} rotation={90} />
                      <input
                        type="text"
                        name="promoCodeSliderInput"
                        placeholder="Enter promo code"
                        onChange={handlePromoInputChange}
                      />
                    </div>

                    <Button
                      onClick={handlePromoButtonClick}
                      content="Apply"
                      background={primaryTheme.colors.black}
                      color={primaryTheme.colors.white}
                    />
                  </div>
                )}

                <button
                  name="noteInput"
                  className="transparent-button"
                  value={orderDetails.noteInput.toString()}
                  onClick={handleButtonClick}
                >
                  <span>
                    <FontAwesomeIcon icon={faClipboard} />
                  </span>
                  Add note
                </button>
                {orderDetails.noteInput && (
                  <textarea
                    name="noteSliderInputValue"
                    placeholder="Wpisz uwagi do zamówienia"
                    rows={4}
                    cols={10}
                    value={orderDetails.noteSliderInputValue}
                    onChange={handleNoteInputChange}
                  />
                )}
              </div>

              <Button
                content="Go to Checkout"
                onClick={handlePayButton}
                color={primaryTheme.colors.white}
                background={primaryTheme.colors.black}
              />

              {isPaymentActive && (
                <Payment
                  orderValue={subtotal}
                  userNote={orderDetails.noteSliderInputValue}
                />
              )}
            </div>
          </div>
        </CardPageSection>
      ) : (
        <EmptyCard />
      )}
    </>
  );
};

export default CardPage;
