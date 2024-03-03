import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
        * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: 'Satoshi', sans-serif;
                font-size: 16px;
        }

        .overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(54, 54, 54, 0.5);
                z-index: 999;
}


`;

export default GlobalStyles;
