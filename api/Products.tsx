import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ProductList from '../actions/productActions/ProductList';
import {
  fetchProductsByCategory,
  getProductsByCategory,
} from '../actions/productActions/getProductsByCategory';

import { useAppDispatch, useAppSelector } from '../store/Store';
import './styles/Products.scss';

const Products = () => {
  const productList = ProductList();
  const navigate = useNavigate();
  const dispatch: any = useAppDispatch();
  let categoryProductList;

  const { category } = useParams<{ category: string }>();

  const handleSingleProductClick = async (id: number) => {
    navigate(`/products/singleProduct/${id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await dispatch(
        fetchProductsByCategory(productList, category),
      );
      dispatch(getProductsByCategory(result));
    };
    fetchData();
  }, [dispatch, productList, category]);

  if (category !== undefined) {
    categoryProductList = useAppSelector(
      (state) => state.products.productsByCategory,
    );
  } else {
    categoryProductList = useAppSelector((state) => state.products.products);
  }

  return (
    <>
      <div className="product-container">
        {categoryProductList.map((product) => (
          <div className="product-card " key={product.id}>
            <div className="product-details">
              <p>
                <strong>{product.title.slice(0, 20)}</strong>
              </p>
              <p>${product.price}</p>
            </div>
            <img
              alt={product.title}
              className="product-img"
              src={product.image}
            ></img>
            <button
              className="add-to-cart-button"
              onClick={() => handleSingleProductClick(product.id)}
            >
              Szczegóły
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Products;
