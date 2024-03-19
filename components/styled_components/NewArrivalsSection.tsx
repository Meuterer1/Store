import styled from 'styled-components';

export const NewArrivalsSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  text-align: center;
  justify-content: space-between;
  width: 90%;
  margin: 50px auto;
  text-align: center;
  z-index: 1;

  h2 {
    font-family: 'Integral';
  }

  .item {
    background: rgb(66, 66, 70, 0.8);
    background-blend: overlay;
    display: flex;
    border-radius: 20px;
    justify-content: center;
    width: calc(30% - 15px);
    height: 80vh;
    margin-left: 15px;
    margin-top: 50px;
    overflow: hidden;
    position: relative;

    -webkit-box-shadow: 3px 3px 10px 4px rgba(89, 87, 87, 1);
    -moz-box-shadow: 3px 3px 10px 4px rgba(89, 87, 87, 1);
    box-shadow: 3px 3px 10px 4px rgba(89, 87, 87, 1);

    z-index: 1;
    transition: 1s;
    cursor: pointer;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      transition: 0.6s ease;
    }

    &:hover {
      background: rgb(66, 66, 70, 0.8);
      background-blend: overlay;

      &::before {
        content: 'DETAILS';
        font-family: 'Integral';
        font-size: 58px;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgb(66, 66, 70, 0.2);
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
      }
    }

    img {
      max-height: 100%;
    }
  }

  @media (max-width: 1000px) {
    width: 100%;
    height: auto;
    justify-content: center;

    .item {
      height: 500px;
      width: 80%;

      img {
        width: 100%;
        height: auto;
        object-fit: cover;
        object-position: top;
      }
    }
  }

  @media (max-width: 400px) {
    h2 {
      font-size: 35px;
    }
  }
`;
