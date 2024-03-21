import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { addToCard } from '../actions/cardActions/addToCard';
import ProductList from '../actions/productActions/ProductList';
import getSingleProduct from '../actions/productActions/getSingleProduct';
import { addToFavourites } from '../actions/usersActions/addToFavourites';
import useMessage from '../hooks/useMessage';
import Button from '../standalones/Button';
import { useAppDispatch, useAppSelector } from '../store/Store';
import { SingleProductContainer } from '../styled_components/SingleProductContainer';
import primaryTheme from '../theme/theme';

const ProductPage = () => {
  const dispatch = useAppDispatch();
  const allProducts = ProductList();
  const [inputValue, setInputValue] = useState(1);
  const [isFavourite, setIsFavourite] = useState(false);
  const users = useAppSelector((state) => state.users.user);
  const message = useMessage();
  const navigate = useNavigate();

  const loggedUser = users.find((user) => user.isLogged === true);

  const { id } = useParams<{ id: string }>();
  const parsedId = id ? parseInt(id, 10) : undefined;

  if (parsedId !== undefined) {
    dispatch(getSingleProduct(parsedId, allProducts));
  }

  const singleProduct = useAppSelector((state) => state.products.singleProduct);

  const handleAddToCardButton = (e: any) => {
    const product = {
      productId: singleProduct.id,
      title: singleProduct.title,
      price: singleProduct.price,
      quantity: inputValue,
      image: singleProduct.image,
      count: singleProduct.rating.count,
      note: '',
    };
    dispatch(addToCard(product));
    message('success', 'Product added to card!');

    if (e.target.id === 'button_buy_now') {
      navigate('/card_page');
    }
  };

  const handleAddToFavouritesButton = () => {
    if (loggedUser && singleProduct && !isFavourite) {
      message('success', 'Product added to favourites!');
      setIsFavourite(true);
    } else if (isFavourite) {
      message('info', 'Pordukt is on your list');
    } else {
      message(
        'info',
        'You have to log in or sign up to add product to favourites',
      );
    }
  };

  useEffect(() => {
    if (loggedUser && singleProduct && !isFavourite) {
      const newFavorites = [singleProduct];
      dispatch(addToFavourites(loggedUser, newFavorites));
    }
  }, [isFavourite]);

  const handleInputValueChange = (operation: string) => {
    const minValue = 0;
    const maxValue = singleProduct.rating.count;

    if (operation === 'increase') {
      if (inputValue >= maxValue) {
        setInputValue(maxValue);
      } else {
        setInputValue((prev) => prev + 1);
      }
    } else if (operation === 'decrease') {
      if (inputValue <= 1) {
        setInputValue(minValue);
      } else {
        setInputValue((prev) => prev - 1);
      }
    }
  };

  return (
    <>
      {singleProduct ? (
        <SingleProductContainer key={singleProduct.id}>
          <div className="image-details">
            <img src={singleProduct.image} alt={singleProduct.title} />
          </div>

          <div className="single-product-details">
            <div className="single-product-header">
              <h3>{singleProduct.title}</h3>
              <button
                type="button"
                id="button_favourites"
                aria-label="Add to Favorites"
                onClick={handleAddToFavouritesButton}
              >
                <FontAwesomeIcon icon={faHeart} id="heart_icon" size="2xl" />
              </button>
            </div>

            <p>SKU: {singleProduct.id}</p>
            <h4>$ {singleProduct.price}</h4>
            <p className="single_product_description">
              {singleProduct.description}
            </p>

            <div className="single_product_buttons">
              <div className="first-section-buttons">
                <div className="item-buttons">
                  <button
                    type="button"
                    title="minus"
                    onClick={() => handleInputValueChange('decrease')}
                  >
                    <FontAwesomeIcon icon={faMinus} size="sm" />
                  </button>
                  <p>{inputValue}</p>
                  <button
                    type="button"
                    title="plus"
                    onClick={() => handleInputValueChange('increase')}
                  >
                    <FontAwesomeIcon icon={faPlus} size="sm" />
                  </button>
                </div>
                <Button
                  id="button_add_to_card"
                  onClick={handleAddToCardButton}
                  background={primaryTheme.colors.black}
                  color={primaryTheme.colors.white}
                  content={'Add to Card'}
                />
              </div>

              <Button
                id="button_buy_now"
                onClick={handleAddToCardButton}
                background={primaryTheme.colors.black}
                color={primaryTheme.colors.white}
                content={'Buy Now'}
              />
            </div>
          </div>
        </SingleProductContainer>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default ProductPage;
