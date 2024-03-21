import styled from 'styled-components';
import primaryTheme from '../theme/theme';

const { gray, hoveredBlack, red } = primaryTheme.colors;
const { primary500Font, primary700Font } = primaryTheme.fonts;

export const SingleItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  position: relative;
  width: 100%;

  &::after {
    content: '';
    background-color: ${gray};
    height: 1px;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
  }

  &:last-of-type {
    &::after {
      height: 0;
    }
  }

  img {
    width: 125px;
    height: 125px;
    padding: 10px;
    border: 1px solid ${gray};
    border-radius: 20px;
    object-fit: contain;
  }

  .item-content {
    display: flex;
    gap: 15px;

    h4 {
      font-family: ${primary700Font};
    }

    p {
      font-family: ${primary500Font};
    }
  }

  .item-content-details {
    display: flex;
    flex-direction: column;
    gap: 15px;

    h3 {
      font-size: 22px;
      font-family: ${primary700Font};
    }
  }

  .item-buttons {
    background-color: ${gray};
    border-radius: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
      border: none;
      background-color: transparent;
      padding: 10px;
      transition: 0.5s ease;

      &:hover {
        cursor: pointer;
        color: ${hoveredBlack};
      }
    }
  }

  .card-buttons {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: end;
    height: 100%;

    #removeFromCardButton {
      border: none;
      background-color: transparent;
      padding: 0;
      margin: 0;
      color: ${red};
      transition: 0.5s ease;

      &:hover {
        cursor: pointer;
        color: ${hoveredBlack};
      }
    }
  }

  .card_sliding_item_quantity {
    height: 100%;
    display: flex;
    align-items: self-end;
  }

  @media (max-width: 800px) {
    .item-content-details {
      h3 {
        font-size: 18px;
      }
    }
    img {
      width: 80px;
      height: 80px;
    }
  }
`;
