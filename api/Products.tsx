import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import ProductList from '../actions/productActions/ProductList';
import {
  fetchProductsByCategory,
  getProductsByCategory,
} from '../actions/productActions/getProductsByCategory';

import { useAppDispatch, useAppSelector } from '../store/Store';
import primaryTheme from '../theme/theme';

const ProductsSection = styled.section`
  margin: 0 auto 30px auto;
  display: flex;
  gap: 10px;
  padding: 50px;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;

  .product-card {
    display: flex;
    flex-wrap: wrap;
    height: 350px;
    width: 280px;
    overflow: hidden;
    justify-content: start;
    transition: 1s linear;
    margin-bottom: 15px;
  }

  .product-details {
    background-color: transparent;
    margin-top: 10px;
    width: 100%;

    p {
      margin: 10px 0;
    }

    h3 {
      font-size: 20px;
    }
  }

  img {
    height: 80%;
    padding: 50px;
    border-radius: 20px;
    background-color: white;
    border: 1px solid ${primaryTheme.colors.gray};
    position: relative;

    object-fit: contain;
    transition: transform 0.3s ease-in-out;
    width: 80%;

    &:hover {
      cursor: pointer;
      transform: scale(1.1);
    }
  }

  @media (max-width: 700px) {
    padding: 50px 20px;
    justify-content: center;
    .product-card {
      width: 100%;
      height: 400px;
    }

    img {
      width: 100%;
    }
  }
`;

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
