import styled from 'styled-components';
import primaryTheme from '../theme/theme';

const { gray } = primaryTheme.colors;

export const ProductsSection = styled.section`
  margin: 0 auto 30px auto;
  display: flex;
  gap: 10px;
  padding: 50px;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;

  .product-card {
    display: flex;
    flex-wrap: wrap;
    height: 350px;
    width: 280px;
    overflow: hidden;
    justify-content: start;
    transition: 1s linear;
    margin-bottom: 15px;
  }

  .product-details {
    background-color: transparent;
    margin-top: 10px;
    width: 100%;

    p {
      margin: 10px 0;
    }

    h3 {
      font-size: 20px;
    }
  }

  img {
    height: 80%;
    padding: 50px;
    border-radius: 20px;
    background-color: white;
    border: 1px solid ${gray};
    position: relative;

    object-fit: contain;
    transition: transform 0.3s ease-in-out;
    width: 80%;

    &:hover {
      cursor: pointer;
      transform: scale(1.1);
    }
  }

  @media (max-width: 700px) {
    padding: 50px 20px;
    justify-content: center;
    .product-card {
      width: 100%;
      height: 400px;
    }

    img {
      width: 100%;
    }
  }
`;
