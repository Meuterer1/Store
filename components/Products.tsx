import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ProductList from '../actions/productActions/ProductList';
import {
  fetchProductsByCategory,
  getProductsByCategory,
} from '../actions/productActions/getProductsByCategory';
import { Product } from '../reducers/productReducer';
import { useAppDispatch, useAppSelector } from '../store/Store';
import { ProductsSection } from '../styled_components/ProductsSection';

const Products = () => {
  const productList = ProductList();
  const navigate = useNavigate();
  const dispatch: any = useAppDispatch();
  let categoryProductList: Product[];

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
    <ProductsSection>
      {categoryProductList.map((product) => (
        <div key={product.id} className="product-card">
          <img
            alt={product.title}
            src={product.image}
            onClick={() => handleSingleProductClick(product.id)}
          ></img>
          <div className="product-details">
            <p>
              <strong>{product.title.slice(0, 20)}</strong>
            </p>
            <h3>${product.price}</h3>
          </div>
        </div>
      ))}
    </ProductsSection>
  );
};

export default Products;
