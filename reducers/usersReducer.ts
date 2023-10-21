import {
    ADD_TO_FAVOURITES,
    ADD_USER,
    GET_ORDER_DETAILS,
    SET_USER_LOGIN_STATUS,
    UPDATE_ORDERS,
    UPDATE_WALLET,
} from '../actions/usersActions/actionTypes';
import { Card } from './cardReducer';
import { Product } from './productReducer';

export interface OrdersHistory {
    date: string;
    subtotal: number,
    deliveryFinalCost: number,
    promoCode: string,
    isPromoActive: boolean,
    promoDiscount: number,
    note: string,
    products: Card[]
}

export interface Users {
  login: string;
  password: string;
  email: string;
  street: string;
  building: string;
  home: string;
  city: string;
  zipCode: string;
  country: string;
  wallet: number;
  isLogged: boolean;
  orders: [{
    date: string;
    subtotal: number,
    deliveryFinalCost: number,
    promoCode: string,
    isPromoActive: boolean,
    promoDiscount: number,
    note: string,
    products: Card[]
}];
  favourites: Product[];
}

export interface UsersState {
  user: Users[];
}

export type UsersAction =
  | { type: typeof ADD_USER; payload: Users }
  | { type: typeof GET_ORDER_DETAILS; payload: Card[] }
  | {
      type: typeof SET_USER_LOGIN_STATUS;
      payload: { login: string; isLogged: boolean };
    }
  | { type: typeof UPDATE_WALLET; payload: { login: string; wallet: number } }
  | { type: typeof UPDATE_ORDERS; payload: { user: Users; order: OrdersHistory[] } }
  | {
      type: typeof ADD_TO_FAVOURITES;
      payload: { user: Users; favourites: Product[] };
    };



const initialState: UsersState = {
  user: [
    {
      login: 'userExample',
      password: 'examplePassword123',
      email: 'example@email.com',
      street: 'Ksiedza Piotra Wawrzyniaka',
      building: '9',
      home: '',
      city: 'Wroclaw',
      zipCode: '53-022',
      country: 'Poland',
      wallet: 300,
      isLogged: false,
        orders: [{
            date: '',
            subtotal: 1014.98,
            deliveryFinalCost: 14.99,
            promoCode: '',
            isPromoActive: false,
            promoDiscount: 0,
            note: 'Proszę nie dzwonić domofonem przy dostawie',
            products: [{
                productId: 14,
                title: "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED ",
                price: 999.99,
                quantity: 1,
                image: "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
                count: 1,
            }]
        }],
        favourites: [],
    },
  ],
};

const usersReducer = (
  state = initialState,
  action: UsersAction,
): UsersState => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        user: [...state.user, action.payload],
      };
    case SET_USER_LOGIN_STATUS:
      const updatedUser = state.user.map((user) => {
        if (user.login === action.payload.login) {
          return {
            ...user,
            isLogged: action.payload.isLogged,
          };
        }
        return user;
      });
      return {
        ...state,
        user: updatedUser,
      };
    case ADD_TO_FAVOURITES:
      const id = action.payload.favourites.map((item) => item.id);
      const isProductInFavourites = action.payload.user.favourites.find(
        (fav) => fav.id === id[0],
      );

      if (isProductInFavourites) {
        return state;
      } else {
        const addToFavourites = state.user.map((user) => {
          if (user.login === action.payload.user.login) {
            const newFavourites = [
              ...user.favourites,
              ...action.payload.favourites,
            ];
            return {
              ...user,
              favourites: newFavourites,
            };
          }
        });
        return {
          user: addToFavourites as Users[],
        };
      }
    case UPDATE_WALLET:
      const updatedWallet = state.user.map((user) => {
        if (user.login === action.payload.login) {
          return {
            ...user,
            wallet: action.payload.wallet,
          };
        }
        return user;
      });
      return {
        ...state,
        user: updatedWallet,
      };

    case UPDATE_ORDERS:
      const updatedOrders = state.user.map((user,i) => {
        if (user.login === action.payload.user.login) {
            const newOrder = action.payload.order;
            const orders = action.payload.user.orders || [];
          return {
            ...user,
            orders: [...orders, ...newOrder],
          };
        }
        return user;
      });
      return {
        ...state,
        user: updatedOrders as Users[],
      };
    default:
      return state;
  }
};

export default usersReducer;
