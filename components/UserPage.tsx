import React, { useState } from 'react';

import Button from '../standalones/Button';
import ViewCart from '../standalones/ViewCart';
import { useAppSelector } from '../store/Store';
import { SingleOrderContainer } from '../styled_components/SingleOrderContainer';
import { UserPageSection } from '../styled_components/UserPageSection';

const UserPage = () => {
  const users = useAppSelector((state) => state.users.user);
  const loggedUser = users.find((user) => user.isLogged === true);
  const ordersArray = loggedUser?.orders;

  const [isShowOrderDetailsClicked, setIsShowOrderDetailsClicked] = useState<
    boolean[]
  >(new Array(ordersArray?.length).fill(false));

  const handleShowOrderDetailsButton = (index: number) => {
    const updatedState = [...isShowOrderDetailsClicked];
    updatedState[index] = !updatedState[index];
    setIsShowOrderDetailsClicked(updatedState);
  };

  const orders = ordersArray?.map((order, i) => {
    return (
      <SingleOrderContainer key={i}>
        <div className="single-row">
          <h4 className="description">Subtotal: </h4>
          <p>$ {order.subtotal}</p>
        </div>

        <div className="single-row">
          <h4 className="description">Delivery:</h4>
          <p>$ {order.deliveryFinalCost.toFixed(2)}</p>
        </div>
        {order.isPromoActive && (
          <div className="single-row">
            <h4 className="description">Discount:</h4>
            <p>$ {order.promoDiscount}</p>
          </div>
        )}
        <div className="single-row">
          <h4 className="description">Note: </h4>
          <p>{order.note}</p>
        </div>
        <Button
          onClick={() => handleShowOrderDetailsButton(i)}
          content="Show details"
          background="transparent"
        />
        {isShowOrderDetailsClicked[i] && (
          <ViewCart cardItems={order.products} showButtons={false} />
        )}
      </SingleOrderContainer>
    );
  });

  return (
    <UserPageSection>
      <div className="user-orders-history">
        <h3>Orders history</h3>
        {orders}
      </div>
      <div className="user-account">
        <div className="single-row">
          <h3>Login: </h3>
          <h3>{loggedUser?.login}</h3>
        </div>

        <div className="user_account_details">
          <div className="single-row">
            <h4>Wallet: </h4>
            <p>$ {loggedUser?.wallet.toFixed(2)}</p>
          </div>
          <div className="single-row">
            <h4>Email: </h4>
            <p>{loggedUser?.email}</p>
          </div>
          <div className="single-row">
            <h4>Adres: </h4>
            <div>
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
    </UserPageSection>
  );
};

export default UserPage;
