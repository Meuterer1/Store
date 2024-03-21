import { animated } from '@react-spring/web';
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSpring } from 'react-spring';

import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import {
  faBars,
  faPowerOff,
  faShoppingBag,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { setUserLogInStatus } from '../actions/usersActions/setUserLoginStatus';
import { useAppDispatch, useAppSelector } from '../store/Store';
import Logo from './Logo';
import SearchInput from './SearchInput';
import { NavSmallScreenComponent } from './styled_components/NavSmallScreenComponent';

const NavSmallScreen = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const dispatch = useAppDispatch();

  const users = useAppSelector((state) => state.users.user);
  const loggedUser = users.find((user) => user.isLogged);

  const animatedOpacity = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    leave: {
      config: {
        duration: 500,
      },
    },

    config: { duration: 500 },
    reverse: !showMenu && true,
  });

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleshowCategories = () => {
    setShowCategories(!showCategories);
  };

  const handleShowSearch = () => {
    setShowSearch(!showSearch);
  };

  const categories = useAppSelector(
    (state) => state.products.productsCategories,
  );

  const handleLogOutButton = () => {
    if (loggedUser) {
      dispatch(setUserLogInStatus(loggedUser, false));
    }
  };

  const menuCategories = categories.map((category) => (
    <NavLink
      key={category}
      to={`/products/${category}`}
      onClick={handleShowMenu}
    >
      {category.slice(0, 1).toUpperCase() + category.slice(1).toLowerCase()}
    </NavLink>
  ));

  return (
    <NavSmallScreenComponent>
      <div>
        <button type="button" title="menu" onClick={handleShowMenu}>
          <FontAwesomeIcon icon={faBars} size="xl" />
        </button>
        <Logo />
      </div>
      <div>
        <button type="button" onClick={handleShowSearch}>
          <img src="/assets/Frame.png" aria-label="eye glass"></img>
        </button>
        <Link to={'/card_page'}>
          <FontAwesomeIcon icon={faShoppingBag} size="xl"></FontAwesomeIcon>
        </Link>
        <Link to={'/account'}>
          <FontAwesomeIcon icon={faUserCircle} size="xl"></FontAwesomeIcon>
        </Link>
        {loggedUser && (
          <Link
            to={''}
            className="log-out"
            onClick={handleLogOutButton}
            title="log out"
          >
            <FontAwesomeIcon icon={faPowerOff} size="xl" />
          </Link>
        )}
      </div>

      {showMenu && (
        <animated.div
          className={`nav-small-screen`}
          style={{ ...animatedOpacity }}
        >
          <div className="header_nav">
            <button
              className="close-button"
              aria-label="close"
              title="close"
              type="button"
              onClick={handleShowMenu}
            >
              <FontAwesomeIcon icon={faBars} size="xl" />
            </button>
            <Logo />
          </div>

          <div className="nav-content">
            <ul>
              <li className="bold">
                <NavLink to="/" onClick={handleShowMenu}>
                  Home
                </NavLink>
              </li>
              <li>
                <div className="dropdown">
                  <button type="button" onClick={handleshowCategories}>
                    Categories
                  </button>
                  {showCategories && (
                    <div className="dropdown-content">{menuCategories}</div>
                  )}
                </div>
              </li>
              <li>
                <NavLink to="/products" onClick={handleShowMenu}>
                  Explore
                </NavLink>
              </li>
              <li>
                <NavLink to="/help" onClick={handleShowMenu}>
                  Help
                </NavLink>
              </li>
            </ul>
          </div>
        </animated.div>
      )}

      {showSearch && <SearchInput width="100%" />}
    </NavSmallScreenComponent>
  );
};

export default NavSmallScreen;
