import React from 'react';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import CardPage from '../api/CardPage';
import LogInComponent from '../api/LogInComponent';
import ProductPage from '../api/ProductPage';
import Products from '../api/Products';
import SummaryPage from '../api/SummaryPage';
import UserPage from '../api/UserPage';
import ContactAndTerms from '../components/ContactAndTerms';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MainPage from '../components/MainPage';
import Menu from '../components/Menu';
import store from '../store/Store';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/App.scss';

const App = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <Router>
          <Header />
          <Menu />
          <Routes>
            <Route index path='/' element={<MainPage />} />
            <Route path="/account" element={<LogInComponent />} />
            <Route path="/card_page" element={<CardPage />} />
            <Route path="/help" element={<ContactAndTerms />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:category" element={<Products />} />
            <Route
              path="/products/singleProduct/:id"
              element={<ProductPage />}
            />
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
        </Router>
      </Provider>
    </React.StrictMode>
  );
};

export default App;
