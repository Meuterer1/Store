import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { faPowerOff, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { setUserLogInStatus } from '../actions/usersActions/setUserLoginStatus';
import Logo from '../standalones/Logo';
import SearchInput from '../standalones/SearchInput';
import { useAppDispatch, useAppSelector } from '../store/Store';
import { NavBigScreenComponent } from '../styled_components/NavBigScreenComponent';

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
