import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import useMessage from '../hooks/useMessage';

import styled from 'styled-components';
import { removeFromCardAction } from '../actions/cardActions/removeFromCard';
import { updateQuantityAction } from '../actions/cardActions/updateQuantity';
import { Card } from '../reducers/cardReducer';
import { useAppDispatch } from '../store/Store';
import primaryTheme from '../theme/theme';

interface CardProps {
  cardItems: Card[];
  showButtons: boolean;
}

const ItemContainer = styled.div`
  width: 100%;
`;

const SingleItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  position: relative;
  width: 100%;

  &::after {
    content: '';
    background-color: ${primaryTheme.colors.gray};
    height: 1px;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
  }

  &:last-of-type {
    &::after {
      height: 0;
    }
  }

  img {
    width: 125px;
    height: 125px;
    padding: 10px;
    border: 1px solid ${primaryTheme.colors.gray};
    border-radius: 20px;
    object-fit: contain;
  }

  .item-content {
    display: flex;
    gap: 15px;

    h4 {
      font-family: ${primaryTheme.fonts.primary700Font};
    }

    p {
      font-family: ${primaryTheme.fonts.primary500Font};
    }
  }

  .item-content-details {
    display: flex;
    flex-direction: column;
    gap: 15px;

    h3 {
      font-size: 22px;
      font-family: ${primaryTheme.fonts.primary700Font};
    }
  }

  .item-buttons {
    background-color: ${primaryTheme.colors.gray};
    border-radius: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
      border: none;
      background-color: transparent;
      padding: 10px;
      transition: 0.5s ease;

      &:hover {
        cursor: pointer;
        color: ${primaryTheme.colors.hoveredBlack};
      }
    }
  }

  .card-buttons {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: end;
    height: 100%;

    #removeFromCardButton {
      border: none;
      background-color: transparent;
      padding: 0;
      margin: 0;
      color: ${primaryTheme.colors.red};
      transition: 0.5s ease;

      &:hover {
        cursor: pointer;
        color: ${primaryTheme.colors.hoveredBlack};
      }
    }
  }

  .card_sliding_item_quantity {
    height: 100%;
    display: flex;
    align-items: self-end;
  }

  @media (max-width: 800px) {
    .item-content-details {
      h3 {
        font-size: 18px;
      }
    }
    img {
      width: 80px;
      height: 80px;
    }
  }
`;

const ViewCart: React.FC<CardProps> = ({
  cardItems = [],
  showButtons = true,
}) => {
  const dispatch = useAppDispatch();
  const message = useMessage();

  const generateKey = (pre: any) => {
    return `${pre}_${new Date().getTime()}`;
  };

  const handleIncreaseQuantityButton = (item: Card) => {
    if (typeof item.quantity === 'string') {
      item.quantity = parseInt(item.quantity);
    }

    const newQuantity = item.quantity + 1;
    dispatch(updateQuantityAction(item, newQuantity));
  };

  const handleDecreaseQuantityButton = (item: Card) => {
    if (typeof item.quantity === 'string') {
      item.quantity = parseInt(item.quantity);
    }

    const newQuantity = item.quantity - 1;

    if (newQuantity <= 0) {
      dispatch(removeFromCardAction(item.productId));
      message('info', 'Produkt usunięty z koszyka!');
    } else {
      dispatch(updateQuantityAction(item, newQuantity));
    }
  };

  const handleRemoveFromCardButton = (item: Card) => {
    dispatch(removeFromCardAction(item.productId));
    message('info', 'Produkt usunięty z koszyka!');
  };

  const card = cardItems.map((item, i) => (
    <SingleItem key={i}>
      <div className="item-content">
        <img alt="" src={item.image}></img>
        <div className="item-content-details" key={item.title}>
          <h4>{item.title?.slice(0, 20) || 'No title'}</h4>
          <h3 id="item_price"> $ {item.price} </h3>
        </div>
      </div>
      <div>
        {showButtons ? (
          <div className="card-buttons">
            <div
              id="removeFromCardButton"
              onClick={() => handleRemoveFromCardButton(item)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </div>
            <div className="item-buttons">
              <button
                type="button"
                title="minus"
                onClick={() => handleDecreaseQuantityButton(item)}
              >
                <FontAwesomeIcon icon={faMinus} size="sm" />
              </button>
              <p>{item.quantity}</p>
              <button
                type="button"
                title="plus"
                onClick={() => handleIncreaseQuantityButton(item)}
              >
                <FontAwesomeIcon icon={faPlus} size="sm" />
              </button>
            </div>
          </div>
        ) : (
          <div className="card_sliding_item_quantity">
            <p>{item.quantity}pc.</p>
          </div>
        )}
      </div>
    </SingleItem>
  ));

  return <ItemContainer key={generateKey(1)}>{card}</ItemContainer>;
};

export default ViewCart;
