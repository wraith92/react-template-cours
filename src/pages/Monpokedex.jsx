import React, { useEffect, useState } from 'react';
import Header from '../components/header/Header';
import FooterStyle2 from '../components/footer/FooterStyle2';
import DataFavorieCollections from '../assets/data/dataFavorieCollections';
import FavorieCollections from '../components/layouts/monpokedex/FavorieCollections';

const Monpokedex = () => {
  const initialFavorites = DataFavorieCollections();
  const [favorites, setFavorites] = useState([]);

  const handleToggleFavorite = (pokemonName) => {
    const updatedFavorites = favorites.filter((pokemon) => pokemon.name !== pokemonName);
    setFavorites(updatedFavorites);
    localStorage.removeItem(pokemonName);
  };

  const handleClearFavorites = () => {
    localStorage.clear();
    setFavorites([]);
  };

  useEffect(() => {
    setFavorites(initialFavorites);
  }, [initialFavorites]);

  return (
    <div className="home-2">
      <Header />
      <button onClick={handleClearFavorites}>Vider mon Pokédex</button>
      <FavorieCollections data={favorites} handleToggleFavorite={handleToggleFavorite} />
      <FooterStyle2 />
    </div>
  );
};

export default Monpokedex;
