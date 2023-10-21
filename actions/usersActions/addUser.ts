import { UsersAction } from '../../reducers/usersReducer';
import { ADD_USER } from '../usersActions/actionTypes';

export const addUserAction = (user: any): UsersAction => ({
  type: ADD_USER,
  payload: user,
});

export const addUser = (
  login: string,
  email: string,
  password: string,
  street: string,
  city: string,
  zipCode: string,
  building: string,
  homeNumber: string,
  country: string,
): UsersAction => {
  const user = {
    login: login,
    email: email,
    password: password,
    street: street,
    building: building,
    city: city,
    zipCode: zipCode,
    home: homeNumber,
    country: country,
    isLogged: true,
    wallet: 300,
    orders: [],
    favourites: [],
  };
  const action = addUserAction(user);
  return action;
};
