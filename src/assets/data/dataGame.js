import axios from 'axios';



export const fetchPokemonData = async () => {
    const calculateHealth = (stats) => {
        const relevantStats = ['hp', 'defense', 'special-defense'];
        let health = 0;

        stats.forEach((stat) => {
          if (relevantStats.includes(stat.stat.name)) {
            health += stat.base_stat;
          }
        });

        return health;
      };
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=200');
    const results = response.data.results;

    const data = await Promise.all(
      results.map(async (pokemon) => {
        const response = await axios.get(pokemon.url);
        const { name, sprites, stats } = response.data;

        const image = sprites?.other?.['official-artwork']?.front_default || sprites?.front_default;
        const img = image || '';

        const health = calculateHealth(stats);

        return {
          img,
          name,
          health,
        };
      })
    );

    return data;
  } catch (error) {
    console.error('Error fetching Pokemon data:', error);
    return [];
  }
};
