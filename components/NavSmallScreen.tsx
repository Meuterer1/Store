import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { faBars, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { animated } from '@react-spring/web';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSpring } from 'react-spring';
import styled from 'styled-components';
import { useAppSelector } from '../store/Store';
import primaryTheme from '../theme/theme';
import Logo from './Logo';
import SearchInput from './SearchInput';

const { white, gray } = primaryTheme.colors;

const NavSmallScreenComponent = styled.nav`
  background: ${white};
  margin: 24px;
  width: 90%;

  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  gap: 40px;

  ul {
    list-style: none;
    display: flex;
    gap: 24px;
  }

  div {
    display: flex;
    align-items: center;
    gap: 24px;
  }

  a {
    font-size: 16px;
  }

  button {
    background-color: transparent;

    border: none;
    margin-top: 6px;
  }

  .close_button {
    font-family: ${primaryTheme.fonts.headerFont};
    width: 21px;
    height: 24px;
  }

  .nav_small_screen {
    background-color: black;
    color: ${white};
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: start;
    padding: 24px;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    z-index: 1;

    .header_nav {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 24px;
      width: 100%;
    }

    .nav_content {
      margin: 30px 50px;
    }

    button {
      color: ${white};
    }

    div {
      display: flex;
      flex-direction: column;
      align-items: start;

      ul {
        display: flex;
        flex-direction: column;

        a {
          color: ${white};
        }
      }

      .dropdown-content {
        display: flex;
        flex-direction: column;
        align-items: start;
        margin-left: 20px;

        a {
          color: ${gray};
        }
      }
    }
  }

  @media (max-width: 420px) {
    .logo {
      display: none;
    }
  }
`;

const NavSmallScreen = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

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
        <FontAwesomeIcon icon={faShoppingBag} size="xl" />
        <FontAwesomeIcon icon={faUserCircle} size="xl" />
      </div>

      {showMenu && (
        <animated.div
          className={`nav_small_screen`}
          style={{ ...animatedOpacity }}
        >
          <div className="header_nav">
            <button
              className="close_button"
              aria-label="close"
              title="close"
              type="button"
              onClick={handleShowMenu}
            >
              <FontAwesomeIcon icon={faBars} size="xl" />
            </button>
            <Logo />
          </div>

          <div className="nav_content">
            <ul>
              <li className="bold">
                <NavLink to="/" onClick={handleShowMenu}>
                  Home
                </NavLink>
              </li>
              <li>
                <div className="dropdown">
                  <button
                    className="categories_button"
                    type="button"
                    onClick={handleshowCategories}
                  >
                    Categories
                  </button>
                  {showCategories && (
                    <div className="dropdown-content">{menuCategories}</div>
                  )}
                </div>
              </li>
              <li>
                <NavLink to="/produucts" onClick={handleShowMenu}>
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
