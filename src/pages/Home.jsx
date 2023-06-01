import React, { useEffect, useState } from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import getPokemonData from '../assets/data/dataCardPokedex';
import PokedexCollections from '../components/layouts/home/CardPokedex';
import { Newsletters } from '../components/layouts/home/Newsletters';

const Home01 = () => {
  const [pokemonData, setPokemonData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getPokemonData();
      setPokemonData(data);
    };

    fetchData();
  }, []);

  return <div className='home-1'>
      <Header />

      <PokedexCollections data={pokemonData}/>
      <Footer />
  </div>;
};

export default Home01;
