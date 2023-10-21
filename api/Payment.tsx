import { faWallet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { updateOrders } from '../actions/usersActions/updateOrders';
import { updateWallet } from '../actions/usersActions/updateWallet';
import { OrdersHistory } from '../reducers/usersReducer';
import { useAppDispatch, useAppSelector } from '../store/Store';
import useMessage from './hooks/useMessage';
import './styles/Payment.scss';

interface PaymentProps {
  orderValue: number;
  userNote: string;
}

interface LinkState {
  wallet: boolean;
  blik: boolean;
  visa: boolean;
}

type LinkName = 'wallet' | 'blik' | 'visa';

const Payment: React.FC<PaymentProps> = ({ orderValue, userNote }) => {
  const [isLinkActive, setIsLinkActive] = useState<LinkState>({
    wallet: false,
    blik: false,
    visa: false,
  });
  const [isToolTipActive, setIsToolTipActive] = useState(false);
  const user = useAppSelector((state) => state.users.user);
  const loggedUser = user.find((user) => user.isLogged === true);
  const orderDetails = useAppSelector(state => state.card);

  const {subtotal, deliveryCost, deliveryPromo, promoCode, promoDiscount, note, isPromoActive} = orderDetails;

  const deliveryFinal = deliveryCost - deliveryPromo;

  const orders:OrdersHistory = {
        date: '',
        subtotal: subtotal,
        deliveryFinalCost: deliveryFinal,
        promoCode: promoCode,
        isPromoActive: isPromoActive,
        promoDiscount: promoDiscount,
        note: userNote,
        products: orderDetails.card,
  }
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
    <>
      <Link
        to=""
        data-name="wallet"
        className="payment_item"
        onClick={handlePaymentItemClick}
      >
        <span>
          <FontAwesomeIcon icon={faWallet} size="2xl" />
        </span>
        <p>Środki własne</p>
      </Link>
      {isLinkActive.wallet &&
        (loggedUser ? (
          <div className="payment_item_inputs">
            <h3>Twoje środki: </h3>
            <p>$ {loggedUser?.wallet.toFixed(2)}</p>
            <button onClick={handleConfirmPaymentButton}>
              Potwierdź płatność
            </button>
          </div>
        ) : (
          <div className="payment_item_user_not_logged">
            <h4>
              <Link to={'/account'}>Zaloguj się</Link> lub{' '}
              <Link to={'/account'}>zarejestruj</Link>
            </h4>
          </div>
        ))}

      <Link
        to=""
        data-name="blik"
        className="payment_item blik"
        onClick={handlePaymentItemClick}
      >
        <span>
          <img src="/assets/payment logos/BLIK-LOGO-RGB.png" alt="BLIK" />
        </span>
        <p>BLIK</p>
      </Link>
      {isLinkActive.blik && (
        <div className="payment_item_inputs">
          <input
            type="text"
            placeholder="Wpisz kod"
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
            readOnly
          />
          {isToolTipActive && (
            <div className="tooltip">
              <p>Płatność tymczasowo niedostępna</p>
            </div>
          )}
        </div>
      )}
      <Link
        to=""
        data-name="visa"
        className="payment_item"
        onClick={handlePaymentItemClick}
      >
        <span className="visa">
          <img
            src="assets/payment logos/Visa_Brandmark_Blue_RGB.png"
            alt="VISA"
          />
        </span>
        <p>Karta Płatnicza</p>
      </Link>
      {isLinkActive.visa && (
        <div className="payment_item_inputs">
          <input
            type="text"
            placeholder="Wpisz kod"
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
            readOnly
          />
          {isToolTipActive && (
            <div className="tooltip">
              <p>Płatność tymczasowo niedostępna</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Payment;
