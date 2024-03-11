import React from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import ProductList from '../actions/productActions/ProductList';
import getTrendingProducts from '../actions/productActions/getTrendingProductsAction';
import primaryTheme from '../theme/theme';

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

  .dropdown {
    transition: 0.4s ease;
    &:hover {
      background-color: ${primaryTheme.colors.gray};
      cursor: pointer;
    }
  }

  .search-dropdown-item {
    align-items: center;
    display: flex;
    gap: 10px;
    padding: 10px;
    flex-wrap: nowrap;
    justify-content: space-around;
    border-radius: 20px;
    max-height: 60px;
    position: relative;
    z-index: 2;

    .search_dropdown_item_details {
      background-color: transparent;
      p {
        background-color: transparent;
      }
      .search_dropdown_item_title {
        font-weight: 800;
      }
    }
    .search_dropdown_item_img {
      align-items: center;
      display: flex;
      padding: 10px;
      border-radius: 20px;
      justify-content: center;
      background-color: white;
      height: 55px;
      width: 65px;
    }
    img {
      object-fit: contain;
      max-height: 40px;
      max-width: 50px;
    }

    &:hover {
      background-color: ${primaryTheme.colors.gray};
      cursor: pointer;
    }

    &::after {
      content: '';
      background-color: ${primaryTheme.colors.gray};
      height: 1px;
      width: 90%;
      position: absolute;
      transform: translateX(5%);
      bottom: 0;
      left: 0;
    }
  }
  .title {
    background-color: transparent;
    font-family: ${primaryTheme.fonts.headerFont};
    padding-left: 10px;
  }

  .search_dropdown_container {
    background-color: rgb(245, 239, 239);
    border: 0.5px solid black;
    border-top: none;
    font-size: $dropdown_font_size;
    padding: 5px;
    position: absolute;
    width: 250px;

    :hover {
      background-color: rgb(2, 2, 2, 0.3);
    }
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
        className="search-dropdown-item dropdown"
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
        className="search-dropdown-item "
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
        <p className="title">
          {value !== '' ? 'Result: ' : 'Trending products'}
        </p>
        {dropdown}
      </SearchDropdownContainer>
    );
  }
};

export default DropdownList;
