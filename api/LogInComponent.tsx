import React, { useState } from 'react';

import { setUserLogInStatus } from '../actions/usersActions/setUserLoginStatus';
import { useAppDispatch, useAppSelector } from '../store/Store';
import FormInput from './Form/Form';
import useMessage from './hooks/useMessage';

import { addUser } from '../actions/usersActions/addUser';

import { useNavigate } from 'react-router-dom';
import './styles/LogInComponent.scss';

const LogInComponent = () => {
  const users = useAppSelector((state) => state.users.user);
  const dispatch = useAppDispatch();
  const navitgate = useNavigate();
  const message = useMessage();

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
    registrationCountry: 'Polska',
    registrationCheckbox: false,
  });

  const formLogInInputs = [
    {
      id: 1,
      name: 'login',
      type: 'text',
      placeholder: 'Login',
      errorMessage: 'Login nie jest poprawny',
      required: true,
    },
    {
      id: 3,
      name: 'password',
      type: 'password',
      placeholder: 'Hasło',
      errorMessage: 'Hasło nie jest poprawne',
      required: true,
      autoComplete: "off",
    },
  ];

  const formRegistrationInputs = [
    {
      id: 1,
      name: 'registrationLogin',
      type: 'text',
      placeholder: 'Login',
      errorMessage:
        'Login powienien mieć od 3 do 16 znaków oraz nie powinien zawierać znaków specjalnych',
      pattern: '^[A-Za-z0-9]{3,16}$',
      required: true,
    },
    {
      id: 2,
      name: 'registrationEmail',
      type: 'email',
      placeholder: 'Email',
      errorMessage: 'Email powinien być poprawny',
      required: true,
    },
    {
      id: 3,
      name: 'registrationPassword',
      type: 'password',
      placeholder: 'Hasło',
      errorMessage:
        'Hasło powinno zawierać od 8 do 20 znaków oraz zawierać co najmniej 1. wielką literę, 1. znak specjalny oraz 1. cyfrę',
      pattern:
        '^(?=.*[a-zA-Z])(?=.*d)(?=.*[!@#$%^&*()_+])[A-Za-zd][A-Za-zd!@#$%^&*()_+]{8,20}$',
      required: true,
      autoComplete: "off",
    },
    {
      id: 4,
      name: 'registrationRepeatPassword',
      type: 'password',
      placeholder: 'Powtórz hasło',
      errorMessage: 'Wpisane hasła różnią się od siebie',
      pattern: formRegistration.registrationPassword,
      required: true,
      autoComplete: "off",
    },
    {
      id: 5,
      name: 'registrationStreet',
      type: 'text',
      placeholder: 'Ulica',
      errorMessage: 'Podaj ulicę',
      pattern: '^[A-Za-z0-9]{3,25}$',
      required: true,
    },
    {
      id: 6,
      name: 'registrationBuilding',
      type: 'text',
      placeholder: 'Numer budynku',
      errorMessage: 'Niepoprawny numer budynku',
      pattern: '^[a-zA-Z0-9_.-]*$',
      required: true,
    },
    {
      id: 7,
      name: 'registrationHome',
      type: 'text',
      placeholder: 'Numer domu',
      errorMessage: 'Numer domu powinien być cyfrą',
      pattern: '^[0-9]*$',
      required: true,
    },
    {
      id: 8,
      name: 'registrationCity',
      type: 'text',
      placeholder: 'Miasto',
      errorMessage: 'Podaj miasto',
      required: true,
    },
    {
      id: 9,
      name: 'registrationZipCode',
      type: 'text',
      placeholder: 'Kod Pocztowy',
      errorMessage: 'Kod pocztowy powinien być w formacie 10-100',
      pattern: '^[0-9]{2}-[0-9]{3}',
      required: true,
    },
    {
      id: 10,
      name: 'registrationCountry',
      type: 'text',
      placeholder: 'Kraj',
      required: true,
    },
    {
      id: 11,
      name: 'registrationCheckbox',
      type: 'checkbox',
      placeholder: '',
      errorMessage: 'Potwierdź zapoznanie się z regulaminem',
      label: 'Potwierdzam zapoznanie się z regulaminem',
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
      message('success', `Witaj, ${formLogIn.login}!`);
      navitgate('/userPage');
    } else {
      setFormLogIn({
        login: '',
        password: '',
      });
      message(
        'warning',
        `Wskazany użytkownik nie istnieje. Sprawdź login i hasło`,
      );
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
    <>
      <div className="log_in_container">
        <div className="account_registration_container">
          <h2>Zaloguj się</h2>
          <form onSubmit={handleLogInButton}>
            {formLogInInputs.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                onChange={handleLogInFormChange}
                value={formLogIn[input.name as keyof typeof formLogIn]}
              />
            ))}
            <button className='log_in_container_button'>Zaloguj</button>
          </form>
        </div>
        <div className="account_registration_container">
          <h2>Nie masz konta? Załóż je!</h2>
          <form onSubmit={handleRegistrationButton}>
            {formRegistrationInputs.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                onChange={handleRegistrationFormChange}
                value={
                  formRegistration[input.name as keyof typeof formRegistration]
                }
              />
            ))}
            <button className='log_in_container_button'>Zarejestruj</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LogInComponent;
