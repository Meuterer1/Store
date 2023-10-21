import { faBars, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import { useAppSelector } from '../store/Store';

import './styles/Menu.scss';

const Menu = () => {
  const categories = useAppSelector(
    (state) => state.products.productsCategories,
  );

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    const handleOverlayClick = (event: any) => {
      if (isMenuOpen && event.target.classList.contains('overlay')) {
        handleHideSliderMenuButton();
      }
    };

    if (isMenuOpen) {
      window.addEventListener('click', handleOverlayClick);
    }

    window.addEventListener('resize', updateWindowWidth);

    return () => {
      window.removeEventListener('resize', updateWindowWidth);
      window.removeEventListener('click', handleOverlayClick);
    };
  }, [windowWidth, isMenuOpen]);

  const menuCategories = categories.map((category) => (
    <NavLink key={category} to={`/products/${category}`}>
      {category}
    </NavLink>
  ));

  const handleShowSliderMenuButton = () => {
    setIsMenuOpen(true);
  };

  const handleHideSliderMenuButton = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className="menu">
        <nav>
          {windowWidth <= 768 ? (
            <div className="nav_small_screen">
              <div className="logo">
                <p>WINX</p>
              </div>
              <button aria-label="menu" onClick={handleShowSliderMenuButton}>
                <FontAwesomeIcon icon={faBars} size="2xl" />
              </button>
              <div
                className={`nav_small_screen_slider ${
                  isMenuOpen ? 'open' : ''
                }`}
              >
                <button
                  className="close_button"
                  aria-label="close"
                  onClick={handleHideSliderMenuButton}
                >
                  <FontAwesomeIcon icon={faX} size="2xl" />
                </button>
                <ul>
                  <li className="logo">WINX</li>
                  <li className="bold">
                    <NavLink to="/">Strona główna</NavLink>
                  </li>
                  <li>
                    <div className="dropdown">
                      <button className="categories_button" type="button">
                        Kategorie
                      </button>
                      <div className="dropdown-content">{menuCategories}</div>
                    </div>
                  </li>
                  <li>
                    <NavLink to="/help">Pomoc</NavLink>
                  </li>
                </ul>
              </div>
              {isMenuOpen && <div className="overlay"></div>}
            </div>
          ) : (
            <ul className="nav_big_screen">
              <li>WINX</li>
              <li className="bold">
                <NavLink to="/">Strona główna</NavLink>
              </li>
              <li>
                <div className="dropdown">
                  <a>Kategorie</a>
                  <div className="dropdown-content">{menuCategories}</div>
                </div>
              </li>
              <li>
                <NavLink to="/help">Pomoc</NavLink>
              </li>
            </ul>
          )}
        </nav>
        <Outlet />
      </div>
    </>
  );
};

export default Menu;
