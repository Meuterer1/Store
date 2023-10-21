import { Product } from '../../reducers/productReducer';
import { Users, UsersAction } from '../../reducers/usersReducer';
import { ADD_TO_FAVOURITES } from './actionTypes';

export const addToFavouritesAction = (
  loggedUser: Users,
  favourites: Product[],
): UsersAction => ({
  type: ADD_TO_FAVOURITES,
  payload: { user: loggedUser, favourites: favourites },
});

export const addToFavourites = (loggedUser: Users, favourites: Product[]) => {
  const addFav = addToFavouritesAction(loggedUser, favourites);
  return addFav;
};
