import React from 'react';

import { Card } from '../reducers/cardReducer';
import { useAppSelector } from '../store/Store';
import ViewCart from './ViewCart';

import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink } from 'react-router-dom';
import './styles/SlidingCard.scss';

interface CardProps {
  isOpen: boolean;
  onClose: () => void;
  cardItems: Card[];
}

const SlidingCart: React.FC<CardProps> = ({ isOpen, onClose, cardItems }) => {
  const { subtotal, deliveryCost, deliveryPromo } = useAppSelector(
    (state) => state.card,
  );
  const delivery = deliveryCost - deliveryPromo;
  let total = subtotal;
  if (subtotal === 0) {
    const itemCost = cardItems.find(item => {
        return item
    });
    if (itemCost) {
        total = delivery + (itemCost?.price * itemCost?.quantity);
    }
  }

  return (
    <div className={`sliding_panel `}>
      <div className="sliding_panel_headline">
        <button
          className="close-button"
          aria-label="close-button"
          value={''}
          type="button"
          onClick={onClose}
        >
          <FontAwesomeIcon
            icon={faChevronRight}
            size="xl"
            id="close_button_icon"
          />
        </button>
        <NavLink to={'/card_page'}>Koszyk</NavLink>
      </div>
      <div className="sliding_panel_items">
        <ViewCart cardItems={cardItems} showButtons={true} />
        {cardItems.length > 0 ? (
          <div className="sliding_panel_check">
            <div className="delivery">
              <h4>Dostawa: </h4>
              <h4>$ {delivery.toFixed(2)}</h4>
            </div>
            <h3>Suma: </h3>
            <p>$ {total.toFixed(2)}</p>
          </div>
        ) : (
          <h3 id="empty_card">Brak artykułów w koszyku</h3>
        )}
      </div>
      <div className="sliding_panel_bottom">
        <NavLink to={'/card_page'}>Zobacz koszyk</NavLink>
      </div>
    </div>
  );
};

export default SlidingCart;
