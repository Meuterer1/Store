import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import ProductList from '../actions/productActions/ProductList';
import getSingleProduct from '../actions/productActions/getSingleProduct';
import { addToFavourites } from '../actions/usersActions/addToFavourites';
import { useAppDispatch, useAppSelector } from '../store/Store';
import useMessage from './hooks/useMessage';

import { addToCard } from '../actions/cardActions/addToCard';

import { faHeart } from '@fortawesome/free-regular-svg-icons';
import './styles/ProductPage.scss';

const ProductPage = () => {
  const dispatch = useAppDispatch();
  const allProducts = ProductList();
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState(1);
  const [isFavourite, setIsFavourite] = useState(false);
  const users = useAppSelector((state) => state.users.user);
  const message = useMessage();

  const loggedUser = users.find((user) => user.isLogged === true);

  const { id } = useParams<{ id: string }>();
  const parsedId = id ? parseInt(id, 10) : undefined;

  if (parsedId !== undefined) {
    dispatch(getSingleProduct(parsedId, allProducts));
  }

  const singleProduct = useAppSelector((state) => state.products.singleProduct);

  const handleAddToCardButton = () => {
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
    message('success', 'Produkt dodany do koszyka!');
  };

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const handleAddToFavouritesButton = () => {
    if (loggedUser && singleProduct && !isFavourite) {
      message('success', 'Produkt został dodany do ulubionych');
      setIsFavourite(true);
    } else if (isFavourite) {
      message('info', 'Pordukt już znajduje się w ulubionych');
    } else {
      message('info', 'Dodanie do ulubionych jest dostępne po zalogowaniu');
    }
  };

  useEffect(() => {
    if (loggedUser && singleProduct && !isFavourite) {
      const newFavorites = [singleProduct];
      dispatch(addToFavourites(loggedUser, newFavorites));
    }
  }, [isFavourite]);

  return (
    <>
      <div className="single-product-page">
        {/* dodać ścieżkę dostępu z linkami np Home/categoria/nazwa produktu 
        dodać przyciski nawigujące kolejny/następny 
        zrobić zmianę ilości produktów poprzez aktualizację stanu - koszyk
        */}
        {singleProduct ? (
          <div key={singleProduct.id} className="single-product-container">
            <img
              src={singleProduct.image}
              alt={singleProduct.title}
              className="single-product-image"
            />
            <div className="single_product_details">
              <h1>{singleProduct.title}</h1>
              <p>SKU: {singleProduct.id}</p>
              <p>${singleProduct.price}</p>
              <label
                htmlFor="single_product_quantity"
                className="single_product_quantity"
              >
                <input
                  type="number"
                  aria-label="quantity"
                  id="single_product_quantity"
                  min="1"
                  maxLength={singleProduct.rating.count}
                  ref={inputRef}
                  max={singleProduct.rating.count}
                  step="1"
                  value={inputValue}
                  onChange={handleInputChange}
                ></input>
              </label>
              <div className="single_product_buttons">
                <button id="button_add_to_card" onClick={handleAddToCardButton}>
                  Dodaj do koszyka
                </button>
                <button
                  type="button"
                  id="button_favourites"
                  aria-label="Add to Favorites"
                  onClick={handleAddToFavouritesButton}
                >
                  <FontAwesomeIcon icon={faHeart} id="heart_icon" />
                </button>
                <button id="button_buy_now" onClick={handleAddToCardButton}>
                  <NavLink to={'/card_page'}>Kup teraz</NavLink>
                </button>
              </div>
              <p>Informacja o produkcie:</p>
              <p className="single_product_description">
                {singleProduct.description}
              </p>
            </div>
          </div>
        ) : (
          <p>Ładowanie</p>
        )}
      </div>
    </>
  );
};

export default ProductPage;
