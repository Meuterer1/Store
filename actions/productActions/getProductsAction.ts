import { Dispatch } from 'redux';
import { Product } from '../../reducers/productReducer';
import { GET_PRODUCTS_FAILURE, GET_PRODUCTS_SUCCESS } from './actionTypes';
import {
  getProductCategories,
  setProductsCategories,
} from './getProductsCategories';

export const getProductsSuccess = (products: Product[]) => ({
  type: GET_PRODUCTS_SUCCESS,
  payload: products,
});

export const getProducts = () => async (dispatch: Dispatch) => {
  try {
    fetch('https://fakestoreapi.com/products').then((res) =>
      res.json().then((data) => {
        dispatch(getProductsSuccess(data));
        const categories = getProductCategories(data);
        dispatch(setProductsCategories(categories));
      }),
    );
  } catch (error: any) {
    dispatch({
      type: GET_PRODUCTS_FAILURE,
      payload: error.message,
    });
  }
};
