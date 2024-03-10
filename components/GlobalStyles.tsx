import { createGlobalStyle } from 'styled-components';
import primaryTheme from '../theme/theme';

const { hoveredBlack, black } = primaryTheme.colors;

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

        a {
                text-decoration: none;
                color: ${black};

                &:hover {
                        color: ${hoveredBlack}
                }
        }

        h2 {
                text-transform: uppercase;
                width: 100%;
                margin-top: 50px;
                font-size: 60px;
        }

          @media (max-width: 400px) {
                h2 {
                        font-size: 30px;
                }
        }

        ::-webkit-scrollbar {
                width: 5px;
        }

        ::-webkit-scrollbar-thumb {
        background-color: #888;
        border-radius: 5px; 
        }

        ::-webkit-scrollbar-thumb:hover {
        background-color: #555;
        }

        
        ::-webkit-scrollbar-horizontal {
        height: 10px;
        }

        ::-webkit-scrollbar-thumb:horizontal {
        background-color: #888;
        border-radius: 5px; 
        }

        ::-webkit-scrollbar-thumb:hover:horizontal {
        background-color: #555;
        }


`;

export default GlobalStyles;
