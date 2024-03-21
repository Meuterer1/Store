import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import CardPage from '../components/CardPage';
import ContactAndTerms from '../components/ContactAndTerms';
import Footer from '../components/Footer';
import LogInComponent from '../components/LogInComponent';
import NavBigScreen from '../components/NavBigScreen';
import NavSmallScreen from '../components/NavSmallScreen';
import ProductPage from '../components/ProductPage';
import Products from '../components/Products';
import SummaryPage from '../components/SummaryPage';
import UserPage from '../components/UserPage';
import MainPage from '../pages/MainPage';
import RootState from '../reducers/rootState';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getProducts } from '../actions/productActions/getProductsAction';
import EmptyCard from '../components/EmptyCard';
import ScrollToTop from '../components/ScrollToTop';
import { useAppSelector } from '../store/Store';
import './styles/App.scss';

const App = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const dispatch: any = useDispatch();

  const loggedUser = useAppSelector((state: RootState) => state.users.user);

  const isLogged = loggedUser.find((user) => user.isLogged);

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
        <Route
          path="/account"
          element={isLogged ? <UserPage /> : <LogInComponent />}
        />
        <Route path="/card_page" element={<CardPage />} />
        <Route path="/empty_card" element={<EmptyCard />} />
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
      <ScrollToTop />
    </React.StrictMode>
  );
};

export default App;
