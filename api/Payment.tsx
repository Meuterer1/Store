import { faWallet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { updateOrders } from '../actions/usersActions/updateOrders';
import { updateWallet } from '../actions/usersActions/updateWallet';
import Button from '../components/Button';
import useMessage from '../hooks/useMessage';
import { OrdersHistory } from '../reducers/usersReducer';
import { useAppDispatch, useAppSelector } from '../store/Store';
import primaryTheme from '../theme/theme';

interface PaymentProps {
  orderValue: number;
  userNote: string;
}

interface LinkState {
  applePay: boolean;
  googlePay: boolean;
  masterCard: boolean;
  payPal: boolean;
  visa: boolean;
  wallet: boolean;
}

type LinkName = 'wallet' | 'applePay' | 'visa';

const PaymentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 15px;
  width: 100%;

  a:first-of-type {
    padding-top: 8px;
  }

  img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
  span {
    width: 60px;
    display: flex;
    align-content: center;
    flex-wrap: wrap;
    height: 100%;
  }

  .payment-item {
    border-radius: 20px;
    border: 1px solid ${primaryTheme.colors.gray};
    padding: 5px 10px 0 15px;

    display: flex;
    gap: 15px;
    flex-wrap: wrap;
    align-items: center;

    p {
      font-family: ${primaryTheme.fonts.primary700Font};
      font-size: 18px;
      width: 50%;
      padding-bottom: 5px;
    }
  }

  .wallet {
    padding: 15px;
    span {
      margin-left: 10px;
      width: 50px;
    }
    p {
      padding: 0;
    }
  }

  .tooltip {
    width: 100%;
    text-align: center;

    p {
      font-family: ${primaryTheme.fonts.primary500Font};
    }
  }

  .payment_item_inputs {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 10px;
    gap: 15px;

    button {
      width: 100%;
    }
  }
`;

const Payment: React.FC<PaymentProps> = ({ orderValue, userNote }) => {
  const [isLinkActive, setIsLinkActive] = useState<LinkState>({
    applePay: false,
    googlePay: false,
    masterCard: false,
    payPal: false,
    visa: false,
    wallet: false,
  });
  const [isToolTipActive, setIsToolTipActive] = useState(false);
  const user = useAppSelector((state) => state.users.user);
  const loggedUser = user.find((user) => user.isLogged === true);
  const orderDetails = useAppSelector((state) => state.card);

  const {
    subtotal,
    deliveryCost,
    deliveryPromo,
    promoCode,
    promoDiscount,
    note,
    isPromoActive,
  } = orderDetails;

  const deliveryFinal = deliveryCost - deliveryPromo;

  const orders: OrdersHistory = {
    date: '',
    subtotal: subtotal,
    deliveryFinalCost: deliveryFinal,
    promoCode: promoCode,
    isPromoActive: isPromoActive,
    promoDiscount: promoDiscount,
    note: userNote,
    products: orderDetails.card,
  };
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const message = useMessage();

  const handleOnMouseEnter = () => {
    setIsToolTipActive(true);
  };

  const handleOnMouseLeave = () => {
    setIsToolTipActive(false);
  };

  const handlePaymentItemClick = (e: any) => {
    const name = e.currentTarget.getAttribute('data-name') as LinkName;
    setIsLinkActive((prevState) => ({
      ...isLinkActive,
      [name]: !prevState[name],
    }));
  };

  const handleConfirmPaymentButton = () => {
    if (loggedUser && loggedUser.wallet >= orderValue) {
      const wallet = loggedUser?.wallet - orderValue;
      dispatch(updateWallet(loggedUser, wallet));
      dispatch(updateOrders(loggedUser, [orders]));
      message('success', 'Płatność powiodła się! Dziękujemy za zakupy!');
      navigate('/summary');
    } else if (loggedUser && loggedUser.wallet < orderValue) {
      message('warning', 'Za mało środków w portfelu!');
    }
  };

  return (
    <PaymentContainer>
      <Link
        to=""
        data-name="wallet"
        className="payment-item wallet"
        onClick={handlePaymentItemClick}
      >
        <span>
          <FontAwesomeIcon icon={faWallet} size="xl" />
        </span>
        <p>Wallet</p>
      </Link>
      {isLinkActive.wallet &&
        (loggedUser ? (
          <div className="payment_item_inputs">
            <h3>Your wallet: </h3>
            <p>$ {loggedUser?.wallet.toFixed(2)}</p>
            <Button
              onClick={handleConfirmPaymentButton}
              content="Confirm"
              background={primaryTheme.colors.black}
              color={primaryTheme.colors.white}
            />
          </div>
        ) : (
          <div className="tooltip">
            <h4>
              <Link to={'/account'}>Log In</Link> or{' '}
              <Link to={'/account'}>Sign Up</Link>
            </h4>
          </div>
        ))}

      <Link
        to=""
        data-name="applePay"
        className="payment-item"
        onClick={handlePaymentItemClick}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
      >
        <span>
          <img src="/assets/payment logos/applePay.png" alt="apple Pay" />
        </span>
        <p>Apple Pay</p>
      </Link>
      <Link
        to=""
        data-name="visa"
        className="payment-item"
        onClick={handlePaymentItemClick}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
      >
        <span>
          <img src="assets/payment logos/Visa.png" alt="VISA" />
        </span>
        <p>Credit Card</p>
      </Link>
      <Link
        to=""
        data-name="payPal"
        className="payment-item"
        onClick={handlePaymentItemClick}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
      >
        <span>
          <img src="assets/payment logos/PayPal.png" alt="Pay Pal" />
        </span>
        <p>PayPal</p>
      </Link>
      <Link
        to=""
        data-name="googlePay"
        className="payment-item"
        onClick={handlePaymentItemClick}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
      >
        <span>
          <img src="assets/payment logos/GooglePay.png" alt="Google Pay" />
        </span>
        <p>Google Pay</p>
      </Link>
      {isToolTipActive && (
        <div className="tooltip">
          <p>Payment temporarily unavailable</p>
        </div>
      )}
    </PaymentContainer>
  );
};

export default Payment;
