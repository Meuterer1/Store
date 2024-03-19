import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import EmptyCard from '../components/EmptyCard';
import { useAppDispatch, useAppSelector } from '../store/Store';
import ViewCart from './ViewCart';

import { removeFromCardAction } from '../actions/cardActions/removeFromCard';
import primaryTheme from '../theme/theme';

const SummarySection = styled.section`
  display: flex;
  justify-content: space-between;

  margin: 100px 5%;

  .header {
    font-family: ${primaryTheme.fonts.headerFont};
  }
  .payment-summary-details {
    display: flex;
    flex-direction: column;
    gap: 10px;
    border: 1px solid ${primaryTheme.colors.gray};
    border-radius: 20px;
    width: 50%;
    padding: 20px;

    h3 {
      font-family: ${primaryTheme.fonts.primary700Font};
    }

    .header {
      font-family: ${primaryTheme.fonts.headerFont};
    }

    .subtotal {
      position: relative;
      margin-top: 5px;
      padding-top: 5px;

      &::before {
        content: '';
        width: 100%;
        height: 1px;
        position: absolute;
        top: 0;
        left: 0;
        background: ${primaryTheme.colors.gray};
      }
    }
  }

  .single-row {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  .payment {
    width: 40%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-radius: 20px;
    padding: 20px;
    height: fit-content;
    border: 1px solid ${primaryTheme.colors.gray};

    h4 {
      width: 40%;
    }

    h3 {
      font-family: ${primaryTheme.fonts.primary700Font};
    }

    .header {
      font-family: ${primaryTheme.fonts.headerFont};
    }

    p {
      text-align: end;
    }
  }

  @media (max-width: 1100px) {
    flex-direction: column;
    gap: 50px;

    .payment {
      width: 100%;
    }

    .payment-summary-details {
      width: 100%;
    }
  }
`;

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
        <SummarySection>
          <div className="payment-summary-details">
            <h3 className="header">Your order</h3>
            <ViewCart cardItems={showCardItems} showButtons={false} />
            <div className="single-row">
              <h4>Total: </h4>
              <p>$ {sums.toFixed(2)}</p>
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
