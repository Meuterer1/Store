import styled from 'styled-components';
import primaryTheme from '../../theme/theme';

const { white, red } = primaryTheme.colors;

export const NavBigScreenComponent = styled.nav`
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
    color: ${red};
  }
`;
