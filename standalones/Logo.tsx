import React from 'react';
import styled from 'styled-components';

import primaryTheme from '../theme/theme';

const { headerFont } = primaryTheme.fonts;

const LogoComponent = styled.div`
  font-size: 32px;
  font-family: ${headerFont};
  text-transform: uppercase;
  padding-bottom: 5px;

  @media (max-width: 420px) {
    font-size: 25px;
  }
`;

const Logo = () => {
  return <LogoComponent className="logo">Winx.co</LogoComponent>;
};

export default Logo;
