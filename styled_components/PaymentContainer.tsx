import styled from 'styled-components';
import primaryTheme from '../theme/theme';

const { gray } = primaryTheme.colors;
const { primary500Font, primary700Font } = primaryTheme.fonts;

export const PaymentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 15px;
  width: 100%;

  a:first-of-type {
    padding-top: 8px;
  }

  img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
  span {
    width: 60px;
    display: flex;
    align-content: center;
    flex-wrap: wrap;
    height: 100%;
  }

  .payment-item {
    border-radius: 20px;
    border: 1px solid ${gray};
    padding: 5px 10px 0 15px;

    display: flex;
    gap: 15px;
    flex-wrap: wrap;
    align-items: center;

    p {
      font-family: ${primary700Font};
      font-size: 18px;
      width: 50%;
      padding-bottom: 5px;
    }
  }

  .wallet {
    padding: 15px;
    span {
      margin-left: 10px;
      width: 50px;
    }
    p {
      padding: 0;
    }
  }

  .tooltip {
    width: 100%;
    text-align: center;

    p {
      font-family: ${primary500Font};
    }
  }

  .payment_item_inputs {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 10px;
    gap: 15px;

    button {
      width: 100%;
    }
  }
`;
