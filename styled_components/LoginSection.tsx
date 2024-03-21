import styled from 'styled-components';
import primaryTheme from '../theme/theme';

const { headerFont } = primaryTheme.fonts;
const { gray, softGray } = primaryTheme.colors;

export const LogInSection = styled.section`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  height: 1000px;
  margin: 50px 0;
  width: 100%;
  overflow: hidden;

  .log-in-photo {
    height: 100%;
    width: 50%;

    border-radius: 20px;
    overflow: hidden;

    img {
      height: auto;
      width: 100%;
    }
  }

  .log-in-form {
    width: 85%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
  }

  .account-registration-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50px;
    border-radius: 20px;
    padding: 50px;
    height: 100%;
    text-align: center;
    width: 50%;

    form {
      display: flex;
      flex-direction: column;
      width: 80%;
      gap: 20px;
    }
  }

  .buttons {
    display: flex;
    gap: 15px;

    button {
      background: transparent;
      border: none;
      font-size: 58px;
      font-family: ${headerFont};
      position: relative;
      transition: 0.5s ease;

      &:hover {
        cursor: pointer;
      }
    }
  }

  .active {
    color: black;

    &:hover {
      color: ${softGray};
    }
  }

  .disabled {
    color: ${gray};

    &:hover {
      color: ${softGray};
    }
  }

  @media (max-width: 1500px) {
    .buttons {
      button {
        font-size: 45px;
      }
    }
  }

  @media (max-width: 1300px) {
    .log-in-form {
      width: 100%;
    }
  }

  @media (max-width: 1100px) {
    .buttons {
      button {
        font-size: 38px;
      }
    }
  }

  @media (max-width: 1000px) {
    height: auto;

    .log-in-form {
      width: 85%;
    }

    .account-registration-container {
      width: 100%;
    }
  }

  @media (max-width: 600px) {
    .log-in-form {
      width: 100%;
      form {
        width: 100%;
      }
    }
  }

  @media (max-width: 425px) {
    .buttons {
      button {
        font-size: 25px;
      }
    }
  }
`;
