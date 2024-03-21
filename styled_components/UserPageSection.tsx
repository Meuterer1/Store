import styled from 'styled-components';
import primaryTheme from '../theme/theme';

const { gray } = primaryTheme.colors;

export const UserPageSection = styled.section`
  display: flex;
  justify-content: space-between;
  margin: 100px 5% 0 5%;

  .user-orders-history {
    display: flex;
    flex-direction: column;
    gap: 20px;

    width: 50%;

    h3 {
      text-transform: uppercase;
      font-size: 20px;
    }
  }

  .single-row {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .user-account {
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-radius: 20px;
    border: 1px solid ${gray};
    width: 40%;
    padding: 15px;
    text-align: end;
    justify-content: center;
    height: fit-content;
  }

  .user_account_details {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  @media (max-width: 1000px) {
    flex-direction: column;
    gap: 20px;

    .user-orders-history,
    .user-account {
      width: 100%;

      h3 {
        font-size: 18px;
      }
    }
  }
`;
