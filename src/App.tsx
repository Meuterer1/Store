import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import CardPage from '../api/CardPage';
import LogInComponent from '../api/LogInComponent';
import ProductPage from '../api/ProductPage';
import Products from '../api/Products';
import SummaryPage from '../api/SummaryPage';
import UserPage from '../api/UserPage';
import ContactAndTerms from '../components/ContactAndTerms';
import Footer from '../components/Footer';
import NavBigScreen from '../components/NavBigScreen';
import NavSmallScreen from '../components/NavSmallScreen';
import MainPage from '../pages/MainPage';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getProducts } from '../actions/productActions/getProductsAction';
import './styles/App.scss';

const App = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const dispatch: any = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getProducts());
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', updateWindowWidth);

    fetchData();

    return () => {
      window.removeEventListener('resize', updateWindowWidth);
    };
  }, [windowWidth]);

  return (
    <React.StrictMode>
      {windowWidth < 1100 ? <NavSmallScreen /> : <NavBigScreen />}

      <Routes>
        <Route index path="/" element={<MainPage />} />
        <Route path="/account" element={<LogInComponent />} />
        <Route path="/card_page" element={<CardPage />} />
        <Route path="/help" element={<ContactAndTerms />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:category" element={<Products />} />
        <Route path="/products/singleProduct/:id" element={<ProductPage />} />
        <Route path="/summary" element={<SummaryPage />} />
        <Route path="/userPage" element={<UserPage />} />
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Footer />
    </React.StrictMode>
  );
};

export default App;
