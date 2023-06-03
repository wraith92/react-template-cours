
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire, faWater, faLeaf, faBolt, faStar } from '@fortawesome/free-solid-svg-icons';
const getPokemonData = async () => {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=200');
      const results = response.data.results;

      const pokemonData = await Promise.all(
        results.map(async (pokemon) => {
          const response = await axios.get(pokemon.url);
          const { name, sprites, weight, height, types, stats, base_experience  } = response.data;

          const image = sprites?.other?.['official-artwork']?.front_default || sprites?.front_default;
          const img = image || '';

          const pokemonTypes = types.map((type) => type.type.name);

          const strength = stats.reduce((total, stat) => {
            if (stat.stat.name === 'attack' || stat.stat.name === 'defense' || stat.stat.name === 'speed') {
              return total + stat.base_stat;
            }
            return total;
          }, 0);

          const averageHeight = response.data.average_height; // Remplacez "average_height" par le champ réel que vous souhaitez ajouter

          const getTypeIcon = (type) => {
            switch (type) {
              case 'fire':
                return <FontAwesomeIcon icon={faFire} />;
              case 'water':
                return <FontAwesomeIcon icon={faWater} />;
              case 'grass':
                return <FontAwesomeIcon icon={faLeaf} />;
              case 'electric':
                return <FontAwesomeIcon icon={faBolt} />;
              case 'normal':
                return <FontAwesomeIcon icon={faStar} />;
              // Ajoutez d'autres cas pour les types supplémentaires
              default:
                return null;
            }
          };
          return {
            img,
            pokemonTypes,
            name,
            averageHeight,
            weight,
            height,
            baseExperience: base_experience,
            strength,
            getTypeIcon,
          };
        })
      );

      return pokemonData;
    } catch (error) {
      console.error('Error fetching Pokemon data:', error);
      return [];
    }
  };



export default getPokemonData;
