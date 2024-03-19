import React from 'react';
import { useNavigate } from 'react-router-dom';

import { NewArrivalsSection } from './styled_components/NewArrivalsSection';

const NewArrivals = () => {
  const navigate = useNavigate();

  return (
    <NewArrivalsSection>
      <h2>New arrivals</h2>
      <div
        className="item"
        onClick={() => navigate(`/products/singleProduct/18`)}
      >
        <img
          src="./assets/woman_in_white_shirt.jpg"
          alt="woman in white shirt"
        />
      </div>
      <div
        className="item"
        onClick={() => navigate(`/products/singleProduct/16`)}
      >
        <img src="./assets/leather_acket.jpg" alt="" />
      </div>
      <div
        className="item"
        onClick={() => navigate(`/products/singleProduct/1`)}
      >
        <img src="./assets/backpack.jpg" alt="" />
      </div>
    </NewArrivalsSection>
  );
};

export default NewArrivals;
