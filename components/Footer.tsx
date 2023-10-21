import React from 'react';

import {
    faFacebook,
    faInstagram,
    faPinterest,
    faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';

import './styles/Footer.scss';

const Footer = () => {
  return (
    <footer>
      <div className="footer">
        <div className="logo">
          <p>WINX</p>
        </div>
        <div className="customer_care_section">
          <h4>Customer Care</h4>
          <ul>
            <li>
              <NavLink to={'/help'}>Shipping Policy</NavLink>
            </li>
            <li>
              <NavLink to={'/help'}>Contact Us</NavLink>
            </li>
            <li>
              <NavLink to={'/help'}>Return Policy</NavLink>
            </li>
            <li>
              <NavLink to={'/help'}>About Us</NavLink>
            </li>
          </ul>
        </div>
        <div>
          <h4>Visit Our Store</h4>
          <ul>
            <li>500 Terry Francine Street</li>
            <li>San Francisco CA 94158</li>
          </ul>
        </div>
        <div className="social_media_section">
          <h4>Stay Connected</h4>
          <ul>
            <li>
              <a href="#">
                <FontAwesomeIcon icon={faInstagram} size="xl" />
              </a>
            </li>
            <li>
              <a href="#">
                <FontAwesomeIcon icon={faFacebook} size="xl" />
              </a>
            </li>
            <li>
              <a href="#">
                <FontAwesomeIcon icon={faTwitter} size="xl" />
              </a>
            </li>
            <li>
              <a href="#">
                <FontAwesomeIcon icon={faPinterest} size="xl" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="copywright">
        <p>© 2023 by Meuterer</p>
      </div>
    </footer>
  );
};

export default Footer;
