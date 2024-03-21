import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import { useAppSelector } from '../store/Store';
import primaryTheme from '../theme/theme';
import ViewCart from './ViewCart';

const UserPageSection = styled.section`
  display: flex;
  justify-content: space-between;
  margin: 100px 5% 0 5%;

  .user-orders-history {
    display: flex;
    flex-direction: column;
    gap: 20px;

    width: 50%;

    h3 {
      text-transform: uppercase;
      font-size: 20px;
    }
  }

  .single-row {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .user-account {
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-radius: 20px;
    border: 1px solid ${primaryTheme.colors.gray};
    width: 40%;
    padding: 15px;
    text-align: end;
    justify-content: center;
    height: fit-content;
  }

  .user_account_details {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  @media (max-width: 1000px) {
    flex-direction: column;
    gap: 20px;

    .user-orders-history,
    .user-account {
      width: 100%;

      h3 {
        font-size: 18px;
      }
    }
  }
`;

const SingleOrderContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${primaryTheme.colors.gray};
  border-radius: 20px;
  padding: 15px;
  gap: 10px;

  .single-row {
    display: flex;
    justify-content: space-between;
    width: 100%;
    p {
      text-align: end;
    }
  }

  .item-content-details {
    padding: 10px 0 0 10px;
  }
  .description {
    width: 30%;
  }

  @media (max-width: 1000px) {
    width: 100%;
  }
`;

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
