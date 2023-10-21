import { Product } from '../../reducers/productReducer';
import { GET_PRODUCTS_BY_CATEGORY } from './actionTypes';

export const getProductsByCategory = (productsByCategory: Product[]) => ({
  type: GET_PRODUCTS_BY_CATEGORY,
  payload: productsByCategory,
});

export const fetchProductsByCategory = (
  products: Product[],
  category: string | undefined,
) => {
  return (dispatch: any) => {
    const result = products.filter((item) => item.category === category);

    if (result) {
      dispatch(getProductsByCategory(result));
    }
    return result;
  };
};
