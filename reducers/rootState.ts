import { CardState } from './cardReducer';
import { ProductState } from './productReducer';
import { UsersState } from './usersReducer';

interface RootState {
  products: ProductState;
  card: CardState;
  users: UsersState;
}

export default RootState;
