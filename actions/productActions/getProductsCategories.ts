import { Product } from '../../reducers/productReducer';
import { SET_PRODUCTS_CATEGORIES } from './actionTypes';

export const setProductsCategories = (categories: string[]) => ({
  type: SET_PRODUCTS_CATEGORIES,
  payload: categories,
});

export const getProductCategories = (products: Product[]): string[] => {
  const productsArray = Array.isArray(products) ? [...products] : [];
  const allCategories = productsArray.map((product) => {
    return product.category;
  });

  const uniqueCategories = [...new Set(allCategories)];
  uniqueCategories.sort();

  return uniqueCategories;
};
