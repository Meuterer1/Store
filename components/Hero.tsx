import React from 'react';
import { useNavigate } from 'react-router-dom';
import primaryTheme from '../theme/theme';
import Button from './Button';
import { HeroSection } from './HeroSection';

const Hero = () => {
  const { black, white } = primaryTheme.colors;
  const navigate = useNavigate();

  return (
    <HeroSection>
      <div className="hero-content-container">
        <div className="hero-headline">
          <h1>Find clothes that matches your style</h1>
          <p>
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
          <Button
            background={black}
            color={white}
            content="Shop Now"
            onClick={() => navigate('/products')}
          />
        </div>
        <div className="hero-stats-container">
          <div className="hero-stats">
            <h2>200+</h2>
            <p>International Brands</p>
          </div>
          <div className="hero-stats">
            <h2>2,000+</h2>
            <p>High-Quality Products</p>
          </div>
          <div className="hero-stats">
            <h2>30,000+</h2>
            <p>Happy Customers</p>
          </div>
        </div>
      </div>
      <div className="hero-image">
        <img src="assets/Hero.jpg" alt="" />
      </div>
    </HeroSection>
  );
};

export default Hero;
