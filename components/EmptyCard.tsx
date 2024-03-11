import React from 'react';
import styled from 'styled-components';

const EmptyCardSection = styled.section`
  width: 90%;
  margin: 5%;
  display: flex;
  justify-content: center;
  text-align: center;
  position: relative;

  h2 {
    font-size: 58px;
  }

  img {
    height: 60vh;
    width: auto;
    object-fit: contain;
    text: white;
  }
`;

const EmptyCard = () => {
  return (
    <EmptyCardSection>
      <div className="empty-card-content">
        <img src="assets/ShoppingBag.png" alt="shopping bag" />
        <h2>Your card is empty</h2>
      </div>
    </EmptyCardSection>
  );
};

export default EmptyCard;
