import styled from 'styled-components';

import primaryTheme from '../theme/theme';

const { gray, softGray } = primaryTheme.colors;
const { headerFont } = primaryTheme.fonts;

export const HelpSection = styled.section`
  display: flex;
  gap: 50px;
  margin: 50px 5%;

  .customer-care {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 20px;
    background-color: ${gray};
    text-align: center;
    width: 40%;

    padding: 50px;

    border-radius: 20px;
    h3 {
      font-size: 30px;
      font-family: ${headerFont};
      letter-spacing: 1.25px;
      margin-bottom: 15px;
    }
  }

  .customer-care-info {
    display: flex;
    gap: 8px;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    flex-wrap: wrap;
  }

  .form-inputs {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    gap: 10px;
  }

  form {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    gap: 15px;
    width: 100%;
    margin-top: 30px;

    input {
      padding: 15px 30px;
      border-radius: 64px;
      width: 100%;
      border: 1px solid ${softGray};

      &:focus {
        outline: none;
      }
    }

    textarea {
      padding: 15px;
      resize: none;
      border-radius: 20px;
      border: 1px solid ${softGray};

      &:focus {
        outline: none;
      }
    }

    button {
      width: 100%;
    }
  }

  .terms_questions {
    border: 1px solid ${gray};
    border-radius: 20px;
    padding: 10px;
    height: 200px;
    width: 350px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }

  .terms {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
    width: 60%;
    h2 {
      width: 100%;
      text-align: center;
      font-family: ${headerFont};
      margin: 0 0 50px 0;
    }
    h3 {
      margin: 0 0 15px 0;
      font-family: ${headerFont};
      text-align: center;
    }
  }

  ul {
    list-style: none;
    text-align: start;
  }

  @media (max-width: 1100px) {
    flex-direction: column;
    gap: 50px;

    .terms {
      width: 100%;
    }
    .customer-care {
      width: 100%;
    }
  }

  @media (max-width: 500px) {
    .customer-care {
      padding: 30px;
    }
  }
`;
