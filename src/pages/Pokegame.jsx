import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Pagination } from 'react-bootstrap';
import Cardgame from '../components/layouts/game/Cardgame';
import Header from '../components/header/Header';
import { fetchPokemonData } from '../assets/data/dataGame';

const Pokegame = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalAtack, setTotalAtack] = useState(0);
  const [itemsPerPage] = useState(6);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPokemonData = pokemonData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePokemonSelect = (pokemon) => {
    if (selectedPokemon.length < 2) {
      setSelectedPokemon((prevSelectedPokemon) => [...prevSelectedPokemon, pokemon]);
    }
  };

  const handleAttack = () => {
    const [pokemon1, pokemon2] = selectedPokemon;
    const randomAttack = Math.floor(Math.random() * 10) + 1;

    if (pokemon1.health && pokemon2.health) {
      pokemon2.health -= randomAttack;

      if (pokemon2.health <= 0) {
        pokemon2.health = null;
      } else {
        pokemon1.health -= randomAttack;

        if (pokemon1.health <= 0) {
          pokemon1.health = null;
        }
      }

      setSelectedPokemon([pokemon1, pokemon2]);
      setTotalAtack((totalAtack) => totalAtack + 1);
    }
  };

  const renderPokemonCards = currentPokemonData.map((pokemon, index) => (
    <Col key={index} xs={12} sm={6} md={4} lg={3}>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={pokemon.img} />
        <Card.Body>
          <Card.Title>{pokemon.name}</Card.Title>
          <Card.Text>Health: {pokemon.health}</Card.Text>
          <Button variant="primary" onClick={() => handlePokemonSelect(pokemon)} disabled={selectedPokemon.length === 2}>
            Select
          </Button>
        </Card.Body>
      </Card>
    </Col>
  ));

  const renderPagination = () => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(pokemonData.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <Pagination>
        {pageNumbers.map((number) => (
          <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
            {number}
          </Pagination.Item>
        ))}
      </Pagination>
    );
  };

  const isGameOver = selectedPokemon.some((pokemon) => pokemon.health === null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPokemonData();
      setPokemonData(data);
    };

    fetchData();
  }, []);

  return (
    <div className="home-1">
      <Header />
      <Container>
        <Row className="mt-4">{renderPokemonCards}</Row>
        <Row className="mt-4 justify-content-center">{renderPagination()}</Row>
        <Row className="mt-4 justify-content-center">
          <Col xs={12} sm={6} md={4} lg={3}>
            <h5>Pokémon sélectionnés:</h5>
            <ul>
              {selectedPokemon.map((pokemon, index) => (
                <li key={index}>
                  {pokemon.name} - Health: {pokemon.health || 'Vaincu'}
                </li>
              ))}
            </ul>
            <h5>Attaque totale : {totalAtack}</h5>
            {selectedPokemon.length === 2 && !isGameOver && (
              <Button variant="danger" onClick={handleAttack}>
                Attack
              </Button>
            )}
            {isGameOver && (
              <h4>
                Partie terminer ! le gagnant est {selectedPokemon[0].health ? selectedPokemon[0].name : selectedPokemon[1].name}
              </h4>
            )}
          </Col>
        </Row>
      </Container>
      <Cardgame  selectedPokemon={selectedPokemon} />
    </div>
  );
};

export default Pokegame;
