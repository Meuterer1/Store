import styled from 'styled-components';
import primaryTheme from '../theme/theme';

export const HeroSection = styled.section`
  background: ${primaryTheme.colors.gray};

  display: flex;
  justify-content: space-between;

  width: 100%;

  position: relative;

  .hero-content-container {
    display: flex;
    flex-direction: column;

    margin: 100px 0 116px 100px;

    width: 45%;
  }

  .hero-headline {
    display: flex;
    flex-direction: column;
    gap: 32px;

    h1 {
      font-family: 'Integral', 'Inter', sans-serif;
      font-size: 64px;
      text-transform: uppercase;
    }

    p {
      line-height: 30px;
    }

    button {
      width: 210px;
    }
  }

  .hero-stats-container {
    display: flex;
    justify-content: space-between;
    gap: 30px;
    flex-wrap: wrap;

    h2 {
      font-family: 'Satoshi-700', sans-serif;
      font-size: 40px;
    }

    p {
      line-height: 22px;
    }
  }

  .hero-image {
    width: 50%;
    height: 800px;
    overflow: hidden;
    position: relative;

    img {
      margin-top: 50px;
      object-fit: contain;

      width: 100%;
    }

    &::before {
      content: '';
      background-image: url('assets/SmallStar.png');
      position: absolute;
      top: 40%;
      left: 5%;
      width: 56px;
      height: 56px;
    }

    &::after {
      content: '';
      background-image: url('assets/BigStar.png');
      position: absolute;
      top: 15%;
      right: 5%;
      width: 104px;
      height: 104px;
    }
  }

  @media (max-width: 1270px) {
    .hero-content-container {
      margin: 100px 0 86px 80px;

      h2 {
        font-size: 35px;
      }
    }

    .hero-headline {
      h1 {
        font-size: 58px;
      }
    }
  }

  @media (max-width: 1155px) {
    flex-direction: column;
    align-items: center;

    .hero-content-container,
    .hero-image {
      width: 70%;
    }

    .hero-content-container {
      margin: 100px 0 50px 0;
    }
  }

  @media (max-width: 800px) {
    .hero-content-container,
    .hero-image {
      width: 80%;
    }
  }

  @media (max-width: 640px) {
    .hero-stats-container {
      h2 {
        font-size: 30px;
      }

      p {
        font-size: 14px;
      }

      div:last-of-type {
        margin: auto;
      }
    }

    .hero-image {
      margin-top: 0;
      width: 100%;
    }
  }

  @media (max-width: 500px) {
    .hero-image {
      height: 100%;
    }
  }

  @media (max-width: 360px) {
    .hero-stats-container {
      div:last-of-type {
        margin: inherit;
      }
    }

    .hero-headline {
      h1 {
        font-size: 40px;
      }
    }
  }
`;
