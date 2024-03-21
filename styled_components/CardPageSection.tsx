import styled from 'styled-components';
import primaryTheme from '../theme/theme';

const { headerFont, primary700Font } = primaryTheme.fonts;
const { gray, hoveredBlack } = primaryTheme.colors;

export const CardPageSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 50px;
  margin: 20px 5%;

  h2 {
    font-family: ${headerFont};
    font-size: 38px;
    text-transform: uppercase;
  }

  .cart {
    display: flex;
    justify-content: space-between;
  }

  .summary {
    border: 1px solid ${gray};
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 20px 24px;
    width: 45%;

    h3 {
      font-family: ${primary700Font};
      font-size: 24px;
    }
  }

  .summary-details {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;

    p {
      color: rgba(0, 0, 0, 0.6);
    }

    h4 {
      font-family: ${primary700Font};
      font-size: 20px;
    }
  }

  .subtotal {
    padding-top: 15px;
    position: relative;

    &::before {
      background-color: ${gray};
      content: '';
      height: 1px;
      left: 0;
      position: absolute;
      top: 0;
      width: 100%;
    }

    h4 {
      font-size: 22px;
    }
  }

  .promos {
    display: flex;
    flex-direction: column;

    .transparent-button {
      background: transparent;
      border: none;
      display: flex;
      gap: 10px;
      margin: 10px 0;

      &:hover {
        cursor: pointer;
      }
    }
  }

  .promo-code-details {
    display: flex;
    gap: 10px;
  }

  .promo-input {
    align-items: center;
    background-color: ${gray};
    border-radius: 62px;
    color: ${hoveredBlack};
    display: flex;
    gap: 10px;
    padding: 5px 15px;
    width: 100%;

    input {
      background: transparent;
      border: none;
      height: 18px;
      width: 100%;

      &:focus {
        outline: none;
      }
    }
  }

  textarea {
    border: 1px solid ${gray};
    border-radius: 20px;
    color: ${hoveredBlack};
    padding: 15px;
    width: 100%;

    &:focus {
      outline: ${gray};
    }
  }

  @media (max-width: 1000px) {
    .summary {
      width: 100%;
    }

    .cart {
      flex-wrap: wrap;
      gap: 20px;
    }
  }
`;
