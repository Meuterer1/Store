import {
  GET_PRODUCTS_BY_CATEGORY,
  GET_PRODUCTS_FAILURE,
  GET_PRODUCTS_SUCCESS,
  GET_SINGLE_PRODUCT,
  GET_TRENDING_PRODUCTS,
  SEARCH_PRODUCTS,
  SET_PRODUCTS_CATEGORIES,
  SET_SINGLE_PRODUCT,
} from '../actions/productActions/actionTypes';

export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface ProductState {
  productsCategories: string[];
  productsByCategory: Product[];
  products: Product[];
  singleProduct: Product;
  trendingProducts: Product[];
  searchProducts: Product[];
  error: string | null;
}

export type ProductAction =
  | { type: typeof GET_PRODUCTS_SUCCESS; payload: Product[] }
  | { type: typeof SET_PRODUCTS_CATEGORIES; payload: string[] }
  | { type: typeof GET_PRODUCTS_FAILURE; payload: string }
  | { type: typeof GET_TRENDING_PRODUCTS; payload: Product[] }
  | { type: typeof GET_SINGLE_PRODUCT; payload: Product }
  | { type: typeof GET_PRODUCTS_BY_CATEGORY; payload: Product[] }
  | { type: typeof SEARCH_PRODUCTS; payload: Product[] }
  | { type: typeof SET_SINGLE_PRODUCT; payload: Product };

const initialState: ProductState = {
  productsCategories: [],
  productsByCategory: [],
  products: [],
  searchProducts: [],
  singleProduct: {} as Product,
  trendingProducts: [],
  error: null,
};

const productReducer = (
  state = initialState,
  action: ProductAction,
): ProductState => {
  switch (action.type) {
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        error: null,
      };
    case GET_PRODUCTS_FAILURE:
      return {
        ...state,
        products: [],
        error: action.payload,
      };
    case GET_TRENDING_PRODUCTS:
      return {
        ...state,
        trendingProducts: action.payload,
      };
    case GET_SINGLE_PRODUCT:
      return {
        ...state,
        singleProduct: action.payload,
      };
    case SET_SINGLE_PRODUCT:
      return {
        ...state,
        singleProduct: action.payload,
      };
    case SET_PRODUCTS_CATEGORIES:
      return {
        ...state,
        productsCategories: action.payload,
      };
    case GET_PRODUCTS_BY_CATEGORY:
      return {
        ...state,
        productsByCategory: action.payload,
      };
    case SEARCH_PRODUCTS:
      return {
        ...state,
        searchProducts: action.payload,
      };

    default:
      return state;
  }
};

export default productReducer;
