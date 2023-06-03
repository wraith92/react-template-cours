import React,{useEffect, useState} from 'react';
import Header from '../components/header/Header';
import FooterStyle2 from '../components/footer/FooterStyle2';
import DataFavorieCollections from '../assets/data/dataFavorieCollections';
import FavorieCollections from '../components/layouts/monpokedex/FavorieCollections';

const Monpokedex = () => {
  const initialFavorites = DataFavorieCollections();
  const [favorites,setfavorites] = useState([])

  const handleToggleFavorite = (pokemonName) => {
    localStorage.removeItem(pokemonName);
    window.location.reload();
  };
  useEffect(() => {
    setfavorites(initialFavorites)
  }, [initialFavorites]);

  return (
    <div className="home-2">
      <Header />
      <FavorieCollections data={favorites} handleToggleFavorite={handleToggleFavorite} />
      <FooterStyle2 />
    </div>
  );
};

export default Monpokedex;

