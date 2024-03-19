import React, { useState } from 'react';
import styled from 'styled-components';

import { setUserLogInStatus } from '../actions/usersActions/setUserLoginStatus';
import FormInput from '../components/Form';
import useMessage from '../hooks/useMessage';
import { useAppDispatch, useAppSelector } from '../store/Store';

import { addUser } from '../actions/usersActions/addUser';

import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import primaryTheme from '../theme/theme';

const LogInSection = styled.section`
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
      font-family: ${primaryTheme.fonts.headerFont};
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
      color: ${primaryTheme.colors.softGray};
    }
  }

  .disabled {
    color: ${primaryTheme.colors.gray};

    &:hover {
      color: ${primaryTheme.colors.softGray};
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

const LogInComponent = () => {
  const users = useAppSelector((state) => state.users.user);
  const dispatch = useAppDispatch();
  const navitgate = useNavigate();
  const message = useMessage();

  const [logIn, setLogIn] = useState(true);

  const [formLogIn, setFormLogIn] = useState({
    login: '',
    password: '',
  });

  const [formRegistration, setFormRegistration] = useState({
    registrationLogin: '',
    registrationEmail: '',
    registrationPassword: '',
    registrationRepeatPassword: '',
    registrationStreet: '',
    registrationBuilding: '',
    registrationHome: '',
    registrationCity: '',
    registrationZipCode: '',
    registrationCountry: 'Poland',
    registrationCheckbox: false,
  });

  const formLogInInputs = [
    {
      id: 1,
      name: 'login',
      type: 'text',
      placeholder: 'Login',
      errorMessage: 'Login is not valid',
      required: true,
    },
    {
      id: 3,
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      errorMessage: 'Password is not valid',
      required: true,
      autoComplete: 'off',
    },
  ];

  const formRegistrationInputs = [
    {
      id: 1,
      name: 'registrationLogin',
      type: 'text',
      placeholder: 'Login',
      errorMessage:
        'Login should have 3 to 16 characters and should not contain special characters',
      pattern: '^[A-Za-z0-9]{3,16}$',
      required: true,
    },
    {
      id: 2,
      name: 'registrationEmail',
      type: 'email',
      placeholder: 'Email',
      errorMessage: 'Email is not valid',
      required: true,
    },
    {
      id: 3,
      name: 'registrationPassword',
      type: 'password',
      placeholder: 'Password',
      errorMessage:
        'Password should have from 8 to 20 characters and contains at least 1 capital letter, 1 special character and 1 number',
      pattern:
        '^(?=.*[a-zA-Z])(?=.*d)(?=.*[!@#$%^&*()_+])[A-Za-zd][A-Za-zd!@#$%^&*()_+]{8,20}$',
      required: true,
      autoComplete: 'off',
    },
    {
      id: 4,
      name: 'registrationRepeatPassword',
      type: 'password',
      placeholder: 'Repeat password',
      errorMessage: 'Passwords are different',
      pattern: formRegistration.registrationPassword,
      required: true,
      autoComplete: 'off',
    },
    {
      id: 5,
      name: 'registrationStreet',
      type: 'text',
      placeholder: 'Street',
      errorMessage: 'This field is required',
      pattern: '^[A-Za-z0-9]{3,25}$',
      required: true,
    },
    {
      id: 6,
      name: 'registrationBuilding',
      type: 'text',
      placeholder: 'Building',
      errorMessage: 'Building is not valid',
      pattern: '^[a-zA-Z0-9_.-]*$',
      required: true,
    },
    {
      id: 7,
      name: 'registrationHome',
      type: 'text',
      placeholder: 'Home number',
      errorMessage: 'Home number should be a number',
      pattern: '^[0-9]*$',
      required: true,
    },
    {
      id: 8,
      name: 'registrationCity',
      type: 'text',
      placeholder: 'City',
      errorMessage: 'City is required',
      required: true,
    },
    {
      id: 9,
      name: 'registrationZipCode',
      type: 'text',
      placeholder: 'Zip Code',
      errorMessage: 'Zip Code should have format like 10-100',
      pattern: '^[0-9]{2}-[0-9]{3}',
      required: true,
    },
    {
      id: 10,
      name: 'registrationCountry',
      type: 'text',
      placeholder: 'Country',
      required: true,
    },
    {
      id: 11,
      name: 'registrationCheckbox',
      type: 'checkbox',
      placeholder: '',
      errorMessage: 'Accept the terms',
      label:
        'I confirm that I have read and understood the terms and conditions',
      required: true,
    },
  ];

  const handleRegistrationFormChange = (e: any) => {
    setFormRegistration({
      ...formRegistration,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogInFormChange = (e: any) => {
    setFormLogIn({
      ...formLogIn,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogInButton = (e: any) => {
    e.preventDefault();

    const isLoginValid = users.find((user) => user.login === formLogIn.login);
    const isPasswordValid = users.find(
      (user) => user.password === formLogIn.password,
    );

    if (isLoginValid && isPasswordValid) {
      dispatch(setUserLogInStatus(isLoginValid, true));
      message('success', `Hello, ${formLogIn.login}!`);
      navitgate('/userPage');
    } else {
      setFormLogIn({
        login: '',
        password: '',
      });
      message('warning', `User doesn't exist. Check login and password.`);
    }
  };

  const handleRegistrationButton = (e: any) => {
    e.preventDefault();
    const {
      registrationLogin,
      registrationEmail,
      registrationPassword,
      registrationRepeatPassword,
      registrationStreet,
      registrationBuilding,
      registrationHome,
      registrationCity,
      registrationZipCode,
      registrationCountry,
    } = formRegistration;

    if (
      registrationLogin &&
      registrationEmail &&
      registrationPassword &&
      registrationRepeatPassword &&
      registrationStreet &&
      registrationBuilding &&
      registrationHome &&
      registrationCity &&
      registrationZipCode &&
      registrationCountry
    ) {
      dispatch(
        addUser(
          registrationLogin,
          registrationEmail,
          registrationPassword,
          registrationStreet,
          registrationCity,
          registrationZipCode,
          registrationBuilding,
          registrationHome,
          registrationCountry,
        ),
      );
      message('success', `Witaj ${registrationLogin}`);
      navitgate('/card_page');
    }
  };

  return (
    <LogInSection>
      <div className="account-registration-container">
        <div className="buttons">
          <button
            className={logIn ? 'active' : 'disabled'}
            onClick={() => setLogIn(true)}
          >
            Log In
          </button>
          <button
            className={!logIn ? 'active' : 'disabled'}
            onClick={() => setLogIn(false)}
          >
            Sing Up
          </button>
        </div>
        {logIn ? (
          <div className="log-in-form">
            <form onSubmit={handleLogInButton}>
              {formLogInInputs.map((input) => (
                <FormInput
                  key={input.id}
                  {...input}
                  onChange={handleLogInFormChange}
                  value={formLogIn[input.name as keyof typeof formLogIn]}
                />
              ))}
              <Button
                color={primaryTheme.colors.white}
                background={primaryTheme.colors.black}
                content="Log In"
              ></Button>
            </form>
          </div>
        ) : (
          <div className="log-in-form">
            <form onSubmit={handleRegistrationButton}>
              {formRegistrationInputs.map((input) => (
                <FormInput
                  key={input.id}
                  {...input}
                  onChange={handleRegistrationFormChange}
                  value={
                    formRegistration[
                      input.name as keyof typeof formRegistration
                    ]
                  }
                />
              ))}
              <Button
                content="Sign Up"
                color={primaryTheme.colors.white}
                background={primaryTheme.colors.black}
              ></Button>
            </form>
          </div>
        )}
      </div>
      {window.innerWidth > 1000 && (
        <div className="log-in-photo">
          <img src="assets/LogIn.jpg" alt="" />
        </div>
      )}
    </LogInSection>
  );
};

export default LogInComponent;
