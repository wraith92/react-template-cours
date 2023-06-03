import React, { useEffect, useState } from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import getPokemonData from '../assets/data/dataCardPokedex';
import PokedexCollections from '../components/layouts/home/CardPokedex';

const Home = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Function for handling type selection
  const handleTypeSelect = (type) => {
    setSelectedType(type);
  };

  const filterPokemons = (pokemonData) => {
    return pokemonData.filter((pokemon) => {
      // Check if the pokemon name matches the search term
      const nameMatches = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());

      // Check if the pokemon has the selected type
      const hasSelectedType = selectedType ? pokemon.pokemonTypes.includes(selectedType) : true;

      // Return true only if both conditions are satisfied
      return nameMatches && hasSelectedType;
    });
  };

  // Filter Pokémon based on selected type
  const filteredPokemons = filterPokemons(pokemonData);

  // Get unique types from filteredPokemons
  const uniqueTypes = [...new Set(pokemonData.flatMap((item) => item.pokemonTypes))];

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPokemonData();
      setPokemonData(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const storedFavorites = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = JSON.parse(localStorage.getItem(key));
      storedFavorites.push(value);
    }
    setFavorites(storedFavorites);
  }, []);

  const isFavorite = (pokemonName) => {
    return favorites.some((pokemon) => pokemon.name === pokemonName);
  };

  const handleToggleFavorite = (pokemonName) => {
    const pokemon = pokemonData.find((pokemon) => pokemon.name === pokemonName);
    if (pokemon) {
      if (isFavorite(pokemonName)) {
        setFavorites(favorites.filter((fav) => fav.name !== pokemonName));
        localStorage.removeItem(pokemonName);
      } else {
        setFavorites([...favorites, pokemon]);
        localStorage.setItem(pokemonName, JSON.stringify(pokemon));
      }
    }
  };

  return (
    <div className='home-1'>
      <Header />
      <PokedexCollections
        data={filteredPokemons}
        handleToggleFavorite={handleToggleFavorite}
        isFavorite={isFavorite}
        handleSearch={handleSearch}
        searchTerm={searchTerm}
        type={uniqueTypes}
        handleTypeSelect={handleTypeSelect}
      />
      <Footer />
    </div>
  );
};

export default Home;
