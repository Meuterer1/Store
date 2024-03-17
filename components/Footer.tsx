import React, { useState } from 'react';

import {
  faFacebook,
  faGithub,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useMessage from '../api/hooks/useMessage';
import primaryTheme from '../theme/theme';
import Logo from './Logo';

const FooterSection = styled.footer`
  position: relative;
  margin-top: 300px;

  .subscribe {
    display: flex;
    justify-content: center;
    align-items: start;
    position: absolute;
    top: 0;
    left: 5%;
    transform: translateY(-50%);
    background-color: ${primaryTheme.colors.black};
    border-radius: 20px;
    padding: 64px;
    width: 90%;
    color: ${primaryTheme.colors.white};

    h2 {
      margin: 0;
      font-size: 50px;
      width: 65%;
    }
  }

  .subscribeForm {
    justify-content: space-between;
    width: 30%;

    form {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      gap: 14px;
    }

    button {
      background-color: ${primaryTheme.colors.white};
      font-family: 'Satoshi-500', sans-serif;
      border-radius: 62px;
      padding: 16px 32px;
      display: flex;
      font-weight: 500;
      justify-content: center;
      align-items: center;
      width: 100%;
      font-size: 18px;
      transition: 0.7s ease;

      &:hover {
        background-color: ${primaryTheme.colors.gray};
        cursor: pointer;
      }
    }
  }

  .emailInput {
    border-radius: 62px;

    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px 32px;
    background-color: ${primaryTheme.colors.white};
    color: rgba(0, 0, 0, 0.4);

    input {
      border: none;
      height: 18px;
      width: 100%;

      &:focus {
        outline: none;
      }
    }
  }

  .footerContent {
    display: flex;
    gap: 20px;
    justify-content: space-between;
    background-color: ${primaryTheme.colors.gray};
    padding: 140px 100px;

    ul {
      display: flex;
      flex-direction: column;
      gap: 19px;
      margin-top: 50px;
      list-style: none;

      h3 {
        font-size: 18px;
        letter-spacing: 1.28px;
      }
    }
  }

  .footerIntuduce {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 50px;
    width: 20%;
  }

  .footerSocialMedia {
    display: flex;
    gap: 20px;
  }

  @media (max-width: 1300px) {
    .footerIntuduce {
      width: 30%;
    }
    .subscribeForm {
      width: 40%;
    }
  }

  @media (max-width: 1000px) {
    .footerContent {
      flex-wrap: wrap;
      padding: 140px 5%;
    }

    .footerIntuduce {
      gap: 30px;
      width: 100%;
    }

    .emailInput {
      input {
        font-size: 14px;
      }
    }

    .subscribe {
      flex-direction: column;
      padding: 32px;
      gap: 32px;

      h2 {
        width: 100%;
        font-size: 32px;
      }
    }

    .subscribeForm {
      width: 100%;

      button {
        font-size: 14px;
      }
    }
  }

  @media (max-width: 400px) {
    .footerContent {
      padding: 160px 5%;
    }
  }
`;

const Footer = () => {
  const message = useMessage();
  const [subscribe, setSubscribe] = useState('');
  const handleSubscribeInputChange = (e: any) => {
    setSubscribe(e.target.value);
  };

  const handleSubscribeButton = (event: any) => {
    event?.preventDefault();
    if (subscribe) {
      message('success', 'You are assigned to subscribtions!');
    } else {
      message('warning', 'Fill all form fields!');
    }
    setSubscribe('');
  };
  return (
    <FooterSection>
      <div className="subscribe">
        <h2>Stay up to date about our latest offers</h2>
        <div className="subscribeForm">
          <form onSubmit={handleSubscribeButton}>
            <div className="emailInput">
              <FontAwesomeIcon icon={faEnvelope} size="xl" />
              <input
                type="email"
                placeholder="Enter your email address here"
                onChange={handleSubscribeInputChange}
                value={subscribe}
              />
            </div>
            <button type="submit">Subscribe to Newsletter</button>
          </form>
        </div>
      </div>
      <div className="footerContent">
        <div className="footerIntuduce">
          <Logo />
          <p>
            We have clothes that suits your style and which you’re proud to
            wear. From women to men.
          </p>
          <div className="footerSocialMedia">
            <Link to={'/'}>
              <FontAwesomeIcon icon={faTwitter} size="lg" />
            </Link>
            <Link to={'/'}>
              <FontAwesomeIcon icon={faFacebook} size="lg" />
            </Link>

            <Link to={'/'}>
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </Link>

            <Link to={'/'}>
              <FontAwesomeIcon icon={faGithub} size="lg" />
            </Link>
          </div>
        </div>
        <ul>
          <li>
            <h3>COMPANY</h3>
          </li>
          <li>
            <Link to={'/'}>About</Link>
          </li>
          <li>
            <Link to={'/'}>Features</Link>
          </li>
          <li>
            <Link to={'/'}>Works</Link>
          </li>
          <li>
            <Link to={'/'}>Career</Link>
          </li>
        </ul>
        <ul>
          <li>
            <h3>HELP</h3>
          </li>
          <li>
            <Link to={'/help'}>Customer Support</Link>
          </li>
          <li>
            <Link to={'/help'}>Delivery Details</Link>
          </li>
          <li>
            <Link to={'/help'}>Terms & Conditions</Link>
          </li>
          <li>
            <Link to={'/help'}>Privacy Policy</Link>
          </li>
        </ul>
        <ul>
          <li>
            <h3>FAQ</h3>
          </li>
          <li>
            <Link to={'/account'}>Account</Link>
          </li>
          <li>
            <Link to={'/account'}>Manage Deliveries</Link>
          </li>
          <li>
            <Link to={'/userPage'}>Orders</Link>
          </li>
          <li>
            <Link to={'/userPage'}>Payments</Link>
          </li>
        </ul>
      </div>
    </FooterSection>
  );
};

export default Footer;
