import React from 'react';

import Banner from '../components/Banner';
import Hero from '../components/Hero';
import NewArrivals from '../components/NewArrivals';

import '../components/styles/MainPage.scss';

const MainPage = () => {
  return (
    <>
      <Hero />
      <Banner />
      <NewArrivals />
    </>
  );
};

export default MainPage;
