import {
  faBagShopping,
  faSearch,
  faUserLarge,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

import RootState from '../reducers/rootState';

import DropdownList from '../api/DropdownList';

import { useAppDispatch, useAppSelector } from '../store/Store';
import './styles/Header.scss';

import { setUserLogInStatus } from '../actions/usersActions/setUserLoginStatus';
import SlidingCart from '../api/SlidingCart';
import { Users } from '../reducers/usersReducer';

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const dropdownRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const card = useAppSelector((state) => state.card.card);
  const loggedUser = useAppSelector((state: RootState) => state.users.user);

  const isLogged = loggedUser.find((user) => user.isLogged);

  const handleSearchClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleCardClick = () => {
    setIsPanelOpen(true);
  };

  const handleCardClose = () => {
    setIsPanelOpen(false);
  };

  const handleLogOutButton = () => {
    dispatch(setUserLogInStatus(isLogged as Users, false));
  };

  useEffect(() => {
    const handleWindowClick = (event: any) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
        setInputValue('');
      }
    };

    const handleOverlayClick = (event: any) => {
      if (isPanelOpen && event.target.classList.contains('overlay')) {
        handleCardClose();
      }
    };

    if (isPanelOpen) {
      document.addEventListener('click', handleOverlayClick);
    }
    if (showDropdown) {
      window.addEventListener('click', handleWindowClick);
    }

    return () => {
      window.removeEventListener('click', handleWindowClick);
      document.removeEventListener('click', handleOverlayClick);
    };
  }, [
    showDropdown,
    isPanelOpen,
    isLogged?.isLogged,
    isLogged?.wallet,
    loggedUser,
  ]);

  return (
    <header className="header_top">
      <div className="search_dropdown">
        <FontAwesomeIcon
          icon={faSearch}
          size="xs"
          style={{ color: '#000000' }}
        />
        <input
          className="header_input"
          type="text"
          placeholder="SEARCH..."
          onClick={handleSearchClick}
          onChange={handleSearchChange}
          ref={dropdownRef}
          value={inputValue}
        ></input>
        {showDropdown && <DropdownList value={inputValue} />}
      </div>
      <div className="header_right_corner">
        <button className="header_right_corner_item" aria-label="Log in">
          <NavLink to={`${isLogged?.isLogged ? '/userPage' : '/account'} `}>
            <span id="header_login_span">
              <FontAwesomeIcon icon={faUserLarge} size="xl" />
            </span>
            {isLogged && (
              <p>
                <strong>
                  {isLogged.login}, $ {isLogged.wallet.toFixed(2)}
                </strong>
              </p>
            )}
          </NavLink>
        </button>
        <div className="line">
          {isLogged ? (
            <button
              className="header_button_log_out"
              onClick={handleLogOutButton}
            >
              Wyloguj
            </button>
          ) : (
            <p className="header_right_corner_item promo">Darmowa dostawa</p>
          )}
        </div>

        <button className="header_right_corner_item" onClick={handleCardClick}>
          <span>
            <FontAwesomeIcon icon={faBagShopping} size="xl" />
          </span>
          <p>Koszyk</p>
        </button>
        <div>
          <div
            id="card_sliding_item"
            className={`card_sliding_item ${isPanelOpen ? '' : 'hidden'}`}
          >
            <SlidingCart
              isOpen={isPanelOpen}
              onClose={handleCardClose}
              cardItems={card}
            />
          </div>
          {isPanelOpen && (
            <div className="overlay" onClick={handleCardClose}></div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
