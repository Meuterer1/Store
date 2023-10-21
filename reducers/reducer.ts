import { combineReducers } from 'redux';

import cardReducer from './cardReducer';
import productReducer from './productReducer';
import usersReducer from './usersReducer';

const rootReducer = combineReducers({
  card: cardReducer,
  products: productReducer,
  users: usersReducer,
});

export default rootReducer;
