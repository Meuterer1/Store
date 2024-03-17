import React from 'react';
import styled from 'styled-components';
import ViewCart from '../api/ViewCart';
import { useAppSelector } from '../store/Store';
import primaryTheme from '../theme/theme';

const CartSection = styled.section`
  display: flex;
  flex-wrap: wrap;

  border: 1px solid ${primaryTheme.colors.gray};
  border-radius: 20px;
  padding: 20px;

  height: fit-content;
  width: 50%;

  @media (max-width: 1000px) {
    width: 100%;
  }

  @media (max-width: 500px) {
    img {
      width: 100px;
      height: 100px;
    }
  }

  @media (max-width: 500px) {
    padding: 10px;
    img {
      width: 80px;
      height: 80px;
    }
  }
`;

const Cart = () => {
  const cardItems = useAppSelector((state) => state.card.card);

  return (
    <CartSection>
      <ViewCart cardItems={cardItems} showButtons={true} />
    </CartSection>
  );
};

export default Cart;
