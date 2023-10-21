import { Product, ProductAction } from '../../reducers/productReducer';
import { GET_SINGLE_PRODUCT } from './actionTypes';

const getSingleProductAction = (id: number, products: Product[]) => {
  const thisOneProduct = products.find((product) => product.id === id);

  return { type: GET_SINGLE_PRODUCT, payload: thisOneProduct } as ProductAction;
};

const fetchSingleProduct = (id: number, products: Product[]): ProductAction => {
  const action = getSingleProductAction(id, products);
  return action;
};

export default fetchSingleProduct;
