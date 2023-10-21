import React from 'react';
import { useNavigate } from 'react-router-dom';

import ProductList from '../actions/productActions/ProductList';
import getTrendingProducts from '../actions/productActions/getTrendingProductsAction';
import './styles/DropdownList.scss';

const DropdownList: React.FC<{ value: string }> = ({ value }) => {
  const navigate = useNavigate();

  const handleDropdownClick = (productId: number) => {
    navigate(`/products/singleProduct/${productId}`);
  };

  if (value === '') {
    const topRatedProducts = getTrendingProducts();
    const dropdown = topRatedProducts.map((product) => (
      <div
        className="search_dropdown_item"
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
      <div className="search_dropdown_container">
        <p className="title">Trending products</p>
        {dropdown}
      </div>
    );
  } else if (value !== '') {
    const productList = ProductList();
    const filtered = productList.filter((product) =>
      product.title.toLowerCase().startsWith(value.toLowerCase()),
    );
    const dropdown = filtered.map((product) => (
      <div
        className="search_dropdown_item"
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
      <div className="search_dropdown_container">
        <p className="title">
          {value !== '' ? 'Result: ' : 'Trending products'}
        </p>
        {dropdown}
      </div>
    );
  }
};

export default DropdownList;
