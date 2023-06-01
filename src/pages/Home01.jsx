import React from 'react';
import Header from '../components/header/Header';
import Slider01 from '../components/slider/Slider01';
import dataSlider from '../assets/data/dataSlider';
import LiveAution from '../components/layouts/home/LiveAution';
import dataLiveAution from '../assets/data/dataLiveAution'
import LatestCollections from '../components/layouts/home/LatestCollections';
import dataCollections from '../assets/data/dataCollections'
import BestSeller from '../components/layouts/home/BestSeller';
import dataBestSeller from '../assets/data/dataBestSeller'
import TrendingCollections from '../components/layouts/home/TrendingCollections';
import dataTrendingCollections from '../assets/data/dataTrendingCollections'
import Category from '../components/layouts/home/Category';
import dataCategory from '../assets/data/dataCategory'
import Footer from '../components/footer/Footer';
import { Newsletters } from '../components/layouts/home/Newsletters';

const Home01 = () => {
  return <div className='home-1'>
      <Header />
      <Slider01 data={dataSlider} />
      <LiveAution data={dataLiveAution} />
      <LatestCollections data={dataCollections} />
      <BestSeller data={dataBestSeller} />
      <TrendingCollections data={dataTrendingCollections} />
      <Category data={dataCategory} />
      <Newsletters />
      <Footer />
  </div>;
};

export default Home01;
