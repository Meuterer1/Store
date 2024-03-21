import styled from 'styled-components';
import primaryTheme from '../theme/theme';

const { gray } = primaryTheme.colors;

export const SingleOrderContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${gray};
  border-radius: 20px;
  padding: 15px;
  gap: 10px;

  .single-row {
    display: flex;
    justify-content: space-between;
    width: 100%;
    p {
      text-align: end;
    }
  }

  .item-content-details {
    padding: 10px 0 0 10px;
  }
  .description {
    width: 30%;
  }

  @media (max-width: 1000px) {
    width: 100%;
  }
`;
