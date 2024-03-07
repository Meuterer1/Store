import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useMessage from '../api/hooks/useMessage';

const NewArrivalsSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 50px;
  justify-content: center;
  text-align: center;
  justify-content: space-evenly;
  width: 90%;
  margin: 50px auto;
  text-align: center;
  z-index: 1;

  h2 {
    font-family: 'Integral';
  }

  .item {
    background: rgb(66, 66, 70, 0.8);
    background-blend: overlay;
    display: flex;
    border-radius: 20px;
    justify-content: center;
    width: calc(30% - 15px);
    height: 80vh;
    margin-left: 15px;
    margin-top: 50px;
    overflow: hidden;
    position: relative;
    -webkit-box-shadow: 0px 2px 8px 3px rgba(139, 142, 179, 1);
    -moz-box-shadow: 0px 2px 8px 3px rgba(139, 142, 179, 1);
    box-shadow: 0px 2px 8px 3px rgba(139, 142, 179, 1);
    z-index: 1;
    transition: 1s;
    cursor: pointer;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      transition: 0.6s ease;
    }

    &:hover {
      background: rgb(66, 66, 70, 0.8);
      background-blend: overlay;

      &::before {
        content: '';
        background: rgb(66, 66, 70, 0.2);
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
      }
    }

    img {
      max-height: 100%;
    }
  }
`;

const NewArrivals = () => {
  const navigate = useNavigate();
  const message = useMessage();
  const [subscribe, setSubscribe] = useState('');

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
        onClick={() => navigate(`/products/singleProduct/18`)}
      >
        <img src="./assets/leather_acket.jpg" alt="" />
      </div>
      <div
        className="item"
        onClick={() => navigate(`/products/singleProduct/18`)}
      >
        <img src="./assets/backpack.jpg" alt="" />
      </div>
    </NewArrivalsSection>
  );
};

export default NewArrivals;
