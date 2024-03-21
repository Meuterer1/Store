import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
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
        <LazyLoadImage
          src="./assets/woman_in_white_shirt.png"
          alt="woman in white shirt"
        />
      </div>
      <div
        className="item"
        onClick={() => navigate(`/products/singleProduct/16`)}
      >
        <LazyLoadImage
          src="./assets/leather_acket.png"
          alt="woman in leather jacket"
        />
      </div>
      <div
        className="item"
        onClick={() => navigate(`/products/singleProduct/1`)}
      >
        <LazyLoadImage src="./assets/backpack.png" alt="men with backpack" />
      </div>
    </NewArrivalsSection>
  );
};

export default NewArrivals;
