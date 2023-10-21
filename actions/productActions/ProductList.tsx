import { Product } from '../../reducers/productReducer';
import { useAppSelector } from '../../store/Store';

const ProductList = (): Product[] => {
  const products = useAppSelector((state) => state.products.products);

  return products;
};

export default ProductList;
