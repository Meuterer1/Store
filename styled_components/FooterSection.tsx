import styled from 'styled-components';

import primaryTheme from '../theme/theme';

const { black, gray, white } = primaryTheme.colors;

export const FooterSection = styled.footer`
  position: relative;
  margin-top: 300px;

  .subscribe {
    display: flex;
    justify-content: center;
    align-items: start;
    position: absolute;
    top: 0;
    left: 5%;
    transform: translateY(-50%);
    background-color: ${black};
    border-radius: 20px;
    padding: 64px;
    width: 90%;
    color: ${white};

    h2 {
      margin: 0;
      font-size: 50px;
      width: 65%;
    }
  }

  .subscribe-form {
    justify-content: space-between;
    width: 30%;

    form {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      gap: 14px;
    }

    button {
      background-color: ${white};
      font-family: 'Satoshi-500', sans-serif;
      border-radius: 62px;
      padding: 16px 32px;
      display: flex;
      font-weight: 500;
      justify-content: center;
      align-items: center;
      width: 100%;
      font-size: 18px;
      transition: 0.7s ease;

      &:hover {
        background-color: ${gray};
        cursor: pointer;
      }
    }
  }

  .email-input {
    border-radius: 62px;

    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px 32px;
    background-color: ${white};
    color: rgba(0, 0, 0, 0.4);

    input {
      border: none;
      height: 18px;
      width: 100%;

      &:focus {
        outline: none;
      }
    }
  }

  .footer-content {
    display: flex;
    gap: 20px;
    justify-content: space-between;
    background-color: ${gray};
    padding: 140px 100px;

    ul {
      display: flex;
      flex-direction: column;
      gap: 19px;
      margin-top: 50px;
      list-style: none;

      h3 {
        font-size: 18px;
        letter-spacing: 1.28px;
      }
    }
  }

  .footer-intuduce {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 50px;
    width: 20%;
  }

  .footer-social-media {
    display: flex;
    gap: 20px;
  }

  @media (max-width: 1300px) {
    .footer-intuduce {
      width: 30%;
    }
    .subscribe-form {
      width: 40%;
    }
  }

  @media (max-width: 1000px) {
    .footer-content {
      flex-wrap: wrap;
      padding: 140px 5%;
    }

    .footer-intuduce {
      gap: 30px;
      width: 100%;
    }

    .email-input {
      input {
        font-size: 14px;
      }
    }

    .subscribe {
      flex-direction: column;
      padding: 32px;
      gap: 32px;

      h2 {
        width: 100%;
        font-size: 32px;
      }
    }

    .subscribe-form {
      width: 100%;

      button {
        font-size: 14px;
      }
    }
  }

  @media (max-width: 400px) {
    .footer-content {
      padding: 160px 5%;
    }
  }
`;
