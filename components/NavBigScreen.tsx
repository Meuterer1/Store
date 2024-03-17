import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import styled from 'styled-components';

import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { faPowerOff, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { Link, NavLink } from 'react-router-dom';
import { setUserLogInStatus } from '../actions/usersActions/setUserLoginStatus';
import { useAppDispatch, useAppSelector } from '../store/Store';
import primaryTheme from '../theme/theme';
import Logo from './Logo';
import SearchInput from './SearchInput';

const { white, gray } = primaryTheme.colors;

const NavBigScreenComponent = styled.nav`
  background: ${white};
  margin: 24px 100px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;

  ul {
    list-style: none;
    display: flex;
    gap: 24px;
  }

  .navIcons {
    display: flex;
    gap: 24px;
    position: relative;
  }

  a {
    font-size: 18px;
  }

  .dropdown-content {
    background-color: white;
    border-radius: 20px;
    display: flex;
    gap: 15px;
    justify-content: center;
    flex-direction: column;
    margin-top: 10px;
    padding: 20px 15px;
    position: absolute;
    z-index: 1;

    -webkit-box-shadow: 0px 0px 32px -12px rgba(66, 68, 90, 1);
    -moz-box-shadow: 0px 0px 32px -12px rgba(66, 68, 90, 1);
    box-shadow: 0px 0px 32px -12px rgba(66, 68, 90, 1);

    p:first-of-type {
      text-transform: uppercase;
    }
  }

  .login-link {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    align-items: center;
  }

  .log-out {
    color: ${primaryTheme.colors.red};
  }
`;

const NavBigScreen = () => {
  const [showCategories, setShowCategories] = useState(false);
  const dispatch = useAppDispatch();

  const users = useAppSelector((state) => state.users.user);
  const loggedUser = users.find((user) => user.isLogged);

  const categories = useAppSelector(
    (state) => state.products.productsCategories,
  );

  const handleShowCategories = () => {
    setShowCategories(!showCategories);
  };

  const menuCategories = categories.map((category) => (
    <NavLink key={category} to={`/products/${category}`}>
      {category.slice(0, 1).toUpperCase() + category.slice(1).toLowerCase()}
    </NavLink>
  ));

  const handleLogOutButton = () => {
    if (loggedUser) {
      dispatch(setUserLogInStatus(loggedUser, false));
    }
  };

  return (
    <NavBigScreenComponent>
      <Logo />
      <ul>
        <li>
          <Link to={'/'}>Home</Link>
        </li>
        <li>
          <Link to={'/products'} onMouseEnter={handleShowCategories}>
            Categories
          </Link>
          {showCategories && (
            <div
              className="dropdown-content"
              onMouseLeave={handleShowCategories}
            >
              {menuCategories}
            </div>
          )}
        </li>
        <li>
          <Link to={'/products'}>Explore</Link>
        </li>
        <li>
          <Link to={'/help'}>Help</Link>
        </li>
      </ul>
      <SearchInput />

      <div className="navIcons">
        <Link to={'/card_page'}>
          <FontAwesomeIcon icon={faShoppingBag} size="xl"></FontAwesomeIcon>
        </Link>
        <Link to={'/account'} className="login-link">
          <FontAwesomeIcon icon={faUserCircle} size="xl"></FontAwesomeIcon>
          {loggedUser && loggedUser.login}
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
    </NavBigScreenComponent>
  );
};

export default NavBigScreen;
