import styled from 'styled-components';
import primaryTheme from '../theme/theme';

const { headerFont, primary700Font } = primaryTheme.fonts;
const { gray } = primaryTheme.colors;

export const SummarySection = styled.section`
  display: flex;
  justify-content: space-between;

  margin: 100px 5%;

  .header {
    font-family: ${headerFont};
  }
  .payment-summary-details {
    display: flex;
    flex-direction: column;
    gap: 10px;
    border: 1px solid ${gray};
    border-radius: 20px;
    width: 50%;
    padding: 20px;

    h3 {
      font-family: ${primary700Font};
    }

    .header {
      font-family: ${headerFont};
    }

    .subtotal {
      position: relative;
      margin-top: 5px;
      padding-top: 5px;

      &::before {
        content: '';
        width: 100%;
        height: 1px;
        position: absolute;
        top: 0;
        left: 0;
        background: ${gray};
      }
    }
  }

  .single-row {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  .payment {
    width: 40%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-radius: 20px;
    padding: 20px;
    height: fit-content;
    border: 1px solid ${gray};

    h4 {
      width: 40%;
    }

    h3 {
      font-family: ${primary700Font};
    }

    .header {
      font-family: ${headerFont};
    }

    p {
      text-align: end;
    }
  }

  @media (max-width: 1100px) {
    flex-direction: column;
    gap: 50px;

    .payment {
      width: 100%;
    }

    .payment-summary-details {
      width: 100%;
    }
  }
`;
