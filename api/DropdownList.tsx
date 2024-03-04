import React from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import ProductList from '../actions/productActions/ProductList';
import getTrendingProducts from '../actions/productActions/getTrendingProductsAction';
import './styles/DropdownList.scss';

const SearchDropdownContainer = styled.div`
  background-color: white;
  border-radius: 20px;
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-direction: column;
  margin-top: 10px;
  padding: 20px 15px;
  position: absolute;
  top: 48px;
  z-index: 1;

  -webkit-box-shadow: 0px 0px 32px -12px rgba(66, 68, 90, 1);
  -moz-box-shadow: 0px 0px 32px -12px rgba(66, 68, 90, 1);
  box-shadow: 0px 0px 32px -12px rgba(66, 68, 90, 1);

  p:first-of-type {
    text-transform: uppercase;
  }
`;

const DropdownList: React.FC<{
  value: string;
}> = ({ value }) => {
  const navigate = useNavigate();

  const handleDropdownClick = (productId: number) => {
    navigate(`/products/singleProduct/${productId}`);
  };

  if (value === '') {
    const topRatedProducts = getTrendingProducts();
    const dropdown = topRatedProducts.map((product) => (
      <div
        className="search_dropdown_item dropdown"
        key={product.id}
        onClick={() => handleDropdownClick(product.id)}
      >
        <div className="search_dropdown_item_img">
          <img alt={product.title} src={product.image}></img>
        </div>
        <div className="search_dropdown_item_details">
          <p className="search_dropdown_item_title">
            {product.title.slice(0, 20)}
          </p>
          <p>{product.description.slice(0, 20)}</p>
        </div>
      </div>
    ));

    return (
      <SearchDropdownContainer className="dropdown">
        <p className="title">Trending products</p>
        {dropdown}
      </SearchDropdownContainer>
    );
  } else if (value !== '') {
    const productList = ProductList();
    const filtered = productList.filter((product) =>
      product.title.toLowerCase().startsWith(value.toLowerCase()),
    );
    const dropdown = filtered.map((product) => (
      <div
        className="search_dropdown_item "
        key={product.id}
        onClick={() => handleDropdownClick(product.id)}
      >
        <div className="search_dropdown_item_img">
          <img
            className="dropdown"
            alt={product.title}
            src={product.image}
          ></img>
        </div>
        <div className="search_dropdown_item_details ">
          <p className="search_dropdown_item_title dropdown">
            {product.title.slice(0, 20)}
          </p>
          <p>{product.description.slice(0, 20)}</p>
        </div>
      </div>
    ));

    return (
      <SearchDropdownContainer className="dropdown">
        <p className="title dropdown">
          {value !== '' ? 'Result: ' : 'Trending products'}
        </p>
        {dropdown}
      </SearchDropdownContainer>
    );
  }
};

export default DropdownList;
