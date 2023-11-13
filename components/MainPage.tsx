import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

import { getProducts } from '../actions/productActions/getProductsAction';
import useMessage from '../api/hooks/useMessage';

import './styles/MainPage.scss';

const MainPage = () => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const message = useMessage();
  const [subscribe, setSubscribe] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getProducts());
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubscribeInputChange = (e: any) => {
    setSubscribe(e.target.value);
  };

  const handleSubscribeButton = (event: any) => {
    event?.preventDefault();
    if (subscribe) {
      message('success', 'Subskrybcja została ustawiona!');
    } else {
      message('warning', 'Uzupełnij poprawnie pola formularza!');
    }
    setSubscribe('');
  };

  return (
    <>
      <div className="container main_page_offer">
        <div className="first">
          <div className="photo_left">
            <img
              src="./assets/fashion-woman-girl-model-white-suit-sunglasses-street (1).jpg"
              alt=""
            />
          </div>
          <div className="tail_right">
            <h3>Sultry & Smart</h3>
            <p>Hot spring looks</p>
            <NavLink to="/products/women's clothing">Shop Women</NavLink>
          </div>
        </div>
        <div className="second">
          <div className="tail_left">
            <h3>Elegant & slick</h3>
            <p>Get ready for summer</p>
            <NavLink to="/products/men's clothing">Shop Men</NavLink>
          </div>
          <div className="photo_right">
            <img
              src="./assets/man-blue-suit-stands-street-sydney (1).jpg"
              alt=""
            />
          </div>
        </div>
      </div>

      <div className="container new-arrivals">
        <h2>New arrivals</h2>
        <div className="item">
          <img
            src="./assets/woman_in_white_shirt.jpg"
            alt="woman in white shirt"
          />
          <button onClick={() => navigate(`/products/singleProduct/18`)}>
            szczegóły
          </button>
        </div>
        <div className="item">
          <img src="./assets/leather_acket.jpg" alt="" />
          <button onClick={() => navigate(`/products/singleProduct/16`)}>
            szczegóły
          </button>
        </div>
        <div className="item">
          <img src="./assets/backpack.jpg" alt="" />
          <button onClick={() => navigate(`/products/singleProduct/1`)}>
            szczegóły
          </button>
        </div>
        <form className="subscribe" onSubmit={handleSubscribeButton}>
          <h2>Get on the list</h2>
          <p>and be the first to shop new arrivals and exclusive promotions</p>
          <input
            type="email"
            className="subscribe_email"
            placeholder="Enter your name here *"
            aria-label="subscribe input"
            onChange={handleSubscribeInputChange}
            value={subscribe}
          />
          <button className="subscribe_button" type="button">
            Subscribe Now
          </button>
        </form>
      </div>

      <div className="container sale">
        <div className="accessories">
          <img src="./assets/woman-accessories-black-side-view.jpg" alt="" />
          <div className="sale_heading">
            <p>Swoon-worthy</p>
            <h3>Accessories</h3>
          </div>
        </div>
        <div className="winter_sale">
          <img
            src="./assets/attractive-lady-velvet-dress-sunglasses-poses-outside.jpg"
            alt=""
          />
          <div className="sale_heading">
            <p>Winter Sale</p>
            <h3>Now 30% off</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
