import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import useMessage from './hooks/useMessage';

import { removeFromCardAction } from '../actions/cardActions/removeFromCard';
import { updateQuantityAction } from '../actions/cardActions/updateQuantity';
import { Card } from '../reducers/cardReducer';
import { useAppDispatch } from '../store/Store';

import './styles/ViewCard.scss';

interface CardProps {
  cardItems: Card[];
  showButtons: boolean;
}

const ViewCart: React.FC<CardProps> = ({
  cardItems = [],
  showButtons = true,
}) => {

  const dispatch = useAppDispatch();
  const message = useMessage();

  const generateKey = (pre:any) => {
    return `${ pre }_${ new Date().getTime() }`;
}

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
    <div className="card_sliding_single_item" key={i}>
      <div className="card_sliding_item_img">
        <img alt="" src={item.image}></img>
      </div>
      <div className="card_sliding_item_details">
        <div className="card_sliding_item_details_container" key={item.title}>
          <p className="card_sliding_item_title">
            {item.title?.slice(0, 20) || 'Brak tytułu'}
          </p>
          <p id="item_price"> $ {item.price} </p>
        </div>
        {showButtons ? ((
          <div className="card_sliding_item_all_buttons">
            <div className="card_sliding_item_buttons">
              <button
                type="button"
                onClick={() => handleDecreaseQuantityButton(item)}
              >
                {' '}
                -{' '}
              </button>
              <p>{item.quantity}</p>
              <button
                type="button"
                onClick={() => handleIncreaseQuantityButton(item)}
              >
                {' '}
                +{' '}
              </button>
            </div>

            <button
              id="removeFromCardButton"
              type="button"
              aria-label="delete from card"
              onClick={() => handleRemoveFromCardButton(item)}
            >
              <FontAwesomeIcon icon={faXmark} size="2xl" />
            </button>
          </div>
        )) : (
          <div className="card_sliding_item_quantity">
            <p>{item.quantity} szt.</p>
          </div>
        )}
      </div>
    </div>
  ));

  return <div key={generateKey(1)}>{card}</div>;
};

export default ViewCart;
