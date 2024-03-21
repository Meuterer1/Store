import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  faFacebook,
  faGithub,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useMessage from '../hooks/useMessage';
import Logo from '../standalones/Logo';
import { FooterSection } from '../styled_components/FooterSection';

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
        <div className="subscribe-form">
          <form onSubmit={handleSubscribeButton}>
            <div className="email-input">
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
      <div className="footer-content">
        <div className="footer-intuduce">
          <Logo />
          <p>
            We have clothes that suits your style and which you’re proud to
            wear. From women to men.
          </p>
          <div className="footer-social-media">
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
