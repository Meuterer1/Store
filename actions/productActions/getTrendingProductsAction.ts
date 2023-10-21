import ProductList from './ProductList';

const getTrendingProducts = () => {
  const productsDropdown = ProductList();
  const dropdowned = Array.isArray(productsDropdown)
    ? [...productsDropdown]
    : [];
  const sortedProducts = dropdowned.sort(
    (a, b) => a.rating.rate - b.rating.rate,
  );
  const topRatedProducts = sortedProducts.slice(0, 3);
  return topRatedProducts;
};

export default getTrendingProducts;
