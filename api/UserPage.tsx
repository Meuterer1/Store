import React, { useState } from 'react';
import { useAppSelector } from '../store/Store';
import ViewCart from './ViewCart';
import './styles/UserPage.scss';

const UserPage = () => {
  const users = useAppSelector((state) => state.users.user);
  const loggedUser = users.find((user) => user.isLogged === true);
  const ordersArray = loggedUser?.orders;

  const [isShowOrderDetailsClicked, setIsShowOrderDetailsClicked] = useState<boolean[]>(
    new Array(ordersArray?.length).fill(false)
  );

  const handleShowOrderDetailsButton = (index: number) => {
    const updatedState = [...isShowOrderDetailsClicked];
    updatedState[index] = !updatedState[index];
    setIsShowOrderDetailsClicked(updatedState);
  };
  
  const orders =  ordersArray?.map((order, i) => {

    return(
    <div className="user_single_order" key={i}>
      <ViewCart cardItems={order.products} showButtons={false} />
      <div className="user_single_order_summary">
        <button onClick={() => handleShowOrderDetailsButton(i)}>
          Szczegóły zamówienia
        </button>
      </div>
      {isShowOrderDetailsClicked[i] && (
        <div className="user_single_order_summary_details">
                <h4>Kwota zamówienia: </h4>
                <p>$ {order.subtotal}</p>
                <div className="user_single_order_summary_details_item">
                    <h4>Dostawa:</h4>
                    <p>$ {order.deliveryFinalCost}</p>
                </div>
                {order.isPromoActive && (
                    <div className="user_single_order_summary_details_item">
                        <h4>Promocja:</h4>
                        <p>$ {order.promoDiscount}</p>
                    </div>
                )}
            <div className="user_single_order_summary_details_item">
                <h4>Notatka: </h4>
                <p>{order.note}</p>
            </div>
        </div>
      )}
    </div>
  )});

  return (
    <div className="user_orders">
      <div className="user_orders_history">
        <h3>Historia zamówień</h3>
        {orders}
      </div>
      <div className="user_account">
        <h3>{loggedUser?.login}</h3>
        <div className="user_account_details">
          <div className="user_account_details_item">
            <h4>Portfel: </h4>
            <p>$ {loggedUser?.wallet.toFixed(2)}</p>
          </div>
          <div className="user_account_details_item">
            <h4>Email: </h4>
            <p>{loggedUser?.email}</p>
          </div>
          <div className="user_account_details_item">
            <h4>Adres: </h4>
            <div className="user_account_details_item_adress">
              <p>
                {loggedUser?.street} {loggedUser?.building}, {loggedUser?.home}
              </p>
              <p>
                {loggedUser?.zipCode} {loggedUser?.city}, {loggedUser?.country}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
