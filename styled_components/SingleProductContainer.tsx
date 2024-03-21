import styled from 'styled-components';
import primaryTheme from '../theme/theme';

const { gray, hoveredBlack } = primaryTheme.colors;
const { headerFont } = primaryTheme.fonts;

export const SingleProductContainer = styled.section`
  display: flex;
  justify-content: space-evenly;
  margin: 50px auto;
  width: 90%;
  text-transform: uppercase;

  .image-details {
    height: 450px;
    width: 450px;
    border-radius: 20px;
    border: 1px solid ${gray};
    overflow: hidden;

    img {
      padding: 30px;
      object-fit: contain;
      height: 100%;
      width: auto;
    }
  }

  .single-product-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  #button_favourites {
    background: transparent;
    color: ${primaryTheme.colors.red};
    border: none;
    align-self: start;
    padding-top: 5px;

    &:hover {
      cursor: pointer;
      color: red;
    }
  }

  .single-product-details {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 500px;

    h3 {
      font-family: ${headerFont};
      font-size: 30px;
    }

    h4 {
      font-size: 25px;
    }
  }

  #button_buy_now {
    margin-bottom: 20px;
    width: 100%;
  }

  #button_add_to_card {
    width: calc(100% - 160px);
  }

  .item-buttons {
    background-color: ${gray};
    border-radius: 64px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 150px;

    button {
      border: none;
      background-color: transparent;
      transition: 0.5s ease;

      &:hover {
        cursor: pointer;
        color: ${hoveredBlack};
      }
    }
  }

  .first-section-buttons {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    margin: 15px 0;

    button {
      width: 45%;
    }
  }

  .single_product_description {
    h4 {
      font-family: ${headerFont};
    }

    p {
      letter-spacing: 1.25px;
    }
  }

  .single_product_buttons {
    padding-top: 15px;
    position: relative;

    &::before {
      content: '';
      width: 100%;
      height: 1px;
      background-color: ${gray};
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  @media (max-width: 1100px) {
    justify-content: space-between;
    .single-product-details {
      width: 350px;
    }

    .image-details {
      width: 400px;
      height: 400px;
    }
  }

  @media (max-width: 850px) {
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;

    .single-product-details {
      width: 100%;

      h3 {
        font-size: 25px;
      }

      h4 {
        font-size: 20px;
      }

      p {
        font-size: 14px;
      }
    }

    .single_product_buttons {
      margin-top: 30px;
    }
  }

  @media (max-width: 400px) {
    .image-details {
      width: 90vw;
      height: 90vw;
    }
    .first-section-buttons {
      flex-direction: column;
    }
    .item-buttons {
      width: 100%;
      padding: 15px;
    }

    #button_add_to_card {
      width: 100%;
    }
  }
`;
