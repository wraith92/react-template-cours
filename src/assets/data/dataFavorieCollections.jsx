import { useState, useEffect } from 'react';

const DataFavorieCollections = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      const storedFavorites = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = JSON.parse(localStorage.getItem(key));
        storedFavorites.push(value);
      }
      setFavorites(storedFavorites);
    };

    fetchData();
  }, []);

  return favorites;
};

export default DataFavorieCollections;
