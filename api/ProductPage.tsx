import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductList from '../actions/productActions/ProductList';
import getSingleProduct from '../actions/productActions/getSingleProduct';
import { addToFavourites } from '../actions/usersActions/addToFavourites';
import useMessage from '../hooks/useMessage';
import { useAppDispatch, useAppSelector } from '../store/Store';

import { addToCard } from '../actions/cardActions/addToCard';

import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import Button from '../components/Button';
import primaryTheme from '../theme/theme';

const SingleProductContainer = styled.section`
  display: flex;
  justify-content: space-evenly;
  margin: 50px auto;
  width: 90%;
  text-transform: uppercase;

  .image-details {
    height: 450px;
    width: 450px;
    border-radius: 20px;
    border: 1px solid ${primaryTheme.colors.gray};
    overflow: hidden;

    img {
      padding: 30px;
      object-fit: contain;
      height: 100%;
      width: auto;
    }
  }

  .single-product-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  #button_favourites {
    background: transparent;
    color: ${primaryTheme.colors.red};
    border: none;
    align-self: start;
    padding-top: 5px;

    &:hover {
      cursor: pointer;
      color: red;
    }
  }

  .single-product-details {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 500px;

    h3 {
      font-family: ${primaryTheme.fonts.headerFont};
      font-size: 30px;
    }

    h4 {
      font-size: 25px;
    }
  }

  #button_buy_now {
    margin-bottom: 20px;
    width: 100%;
  }

  #button_add_to_card {
    width: calc(100% - 160px);
  }

  .item-buttons {
    background-color: ${primaryTheme.colors.gray};
    border-radius: 64px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 150px;

    button {
      border: none;
      background-color: transparent;
      transition: 0.5s ease;

      &:hover {
        cursor: pointer;
        color: ${primaryTheme.colors.hoveredBlack};
      }
    }
  }

  .first-section-buttons {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    margin: 15px 0;

    button {
      width: 45%;
    }
  }

  .single_product_description {
    h4 {
      font-family: ${primaryTheme.fonts.headerFont};
    }

    p {
      letter-spacing: 1.25px;
    }
  }

  .single_product_buttons {
    padding-top: 15px;
    position: relative;

    &::before {
      content: '';
      width: 100%;
      height: 1px;
      background-color: ${primaryTheme.colors.gray};
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  @media (max-width: 1100px) {
    justify-content: space-between;
    .single-product-details {
      width: 350px;
    }

    .image-details {
      width: 400px;
      height: 400px;
    }
  }

  @media (max-width: 850px) {
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;

    .single-product-details {
      width: 100%;

      h3 {
        font-size: 25px;
      }

      h4 {
        font-size: 20px;
      }

      p {
        font-size: 14px;
      }
    }

    .single_product_buttons {
      margin-top: 30px;
    }
  }

  @media (max-width: 400px) {
    .image-details {
      width: 90vw;
      height: 90vw;
    }
    .first-section-buttons {
      flex-direction: column;
    }
    .item-buttons {
      width: 100%;
      padding: 15px;
    }

    #button_add_to_card {
      width: 100%;
    }
  }
`;

const ProductPage = () => {
  const dispatch = useAppDispatch();
  const allProducts = ProductList();
  const inputRef = useRef<HTMLInputElement>(null);
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

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
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
      {/* dodać ścieżkę dostępu z linkami np Home/categoria/nazwa produktu 
        dodać przyciski nawigujące kolejny/następny 
        zrobić zmianę ilości produktów poprzez aktualizację stanu - koszyk
        */}
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
        <p>Ładowanie</p>
      )}
    </>
  );
};

export default ProductPage;
