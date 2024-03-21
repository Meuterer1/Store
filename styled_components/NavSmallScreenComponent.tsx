import styled from 'styled-components';

import primaryTheme from '../theme/theme';

const { gray, red, white } = primaryTheme.colors;
const { headerFont } = primaryTheme.fonts;

export const NavSmallScreenComponent = styled.nav`
  background: ${white};
  margin: 24px;
  width: 90%;

  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  gap: 40px;

  .log-out {
    color: ${red};
  }

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

  .close-button {
    font-family: ${headerFont};
    width: 21px;
    height: 24px;
  }

  .nav-small-screen {
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

    .header-nav {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 24px;
      width: 100%;
    }

    .nav-content {
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
