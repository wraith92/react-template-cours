import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button, Dropdown, DropdownButton } from 'react-bootstrap';

const PokedexCollections = (props) => {
  const {
    data,
    handleToggleFavorite,
    isFavorite,
    handleSearch,
    searchTerm,
    type,
  } = props;

  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (activePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);
  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [selectedTypes, setSelectedTypes] = useState([]);

  const toggleOverlay = () => {
    setShowOverlay(!showOverlay);
  };

  const handlePageSelect = (page) => {
    setActivePage(page);
  };

  const handlePokemonDetails = (pokemon) => {
    setSelectedPokemon(pokemon);
    toggleOverlay();
  };

  const handleTypeSelect = (selectedType) => {
    if (selectedTypes.includes(selectedType)) {
      setSelectedTypes(selectedTypes.filter((type) => type !== selectedType));
    } else {
      setSelectedTypes([...selectedTypes, selectedType]);
    }
  };

  const filteredData = data.filter((item) => {
    if (selectedTypes.length === 0) {
      return true;
    }
    return selectedTypes.some((type) => item.pokemonTypes.includes(type));
  });

  const filteredPaginatedData = filteredData.slice(startIndex, endIndex);

  const handleFilteredData = () => {
    setActivePage(1);
  };

  return (
    <section className="tf-trendy-collections tf-section">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="sc-heading style-2" style={{ marginBottom: '30px' }}>
              <div className="content-left">
                <div className="inner">
                  <h3>Liste Pokémons</h3>
                </div>
              </div>
              <div className="content-right">
                <DropdownButton
                  id="typeDropdown"
                  title="Type"
                  variant="secondary"
                  onSelect={(eventKey) => handleTypeSelect(eventKey)}
                  className="dropdown-selector"
                >
                  {type.map((type, index) => (
                    <Dropdown.Item
                      key={index}
                      eventKey={type}
                      active={selectedTypes.includes(type)}
                    >
                      {type}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
              </div>
            </div>
            <div className="row align-items-center">
              <div className="col">
                <form className="form-search">
                  <input
                    type="text"
                    placeholder="Search Pokémon"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </form>
              </div>
              <div className="col-auto">
                <button>
                  <i className="far fa-search"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="row trendy">
          {filteredPaginatedData.map((item, index) => (
            <div key={index} className="col-lg-4 col-md-3 col-12">
              <div className="sc-product-item style-2">
                <div className="product-img">
                  <img src={item.img} alt="Bidzen" />
                  <div>
                    <Link
                      to="#"
                      className="sc-button style d-flex justify-content-center align-items-center"
                      onClick={() => handleToggleFavorite(item.name)}
                    >
                      {isFavorite(item.name) ? (
                        <div>
                          <span className="mr-2">
                            <FontAwesomeIcon icon={faTimes} className="heart-icon" />
                          </span>
                        </div>
                      ) : (
                        <div>
                          <span className="mr-2">
                            <FontAwesomeIcon icon={faHeart} className="heart-icon" />
                          </span>
                        </div>
                      )}
                    </Link>
                  </div>
                  <label>{item.pokemonTypes}</label>
                </div>
                <div className="product-content">
                  <h5 className="title">
                    <Link to="/item-details">{item.title}</Link>
                  </h5>
                  <div className="product-author flex">
                    <div className="name"></div>
                    <div className="infor">
                      <div className="author-name">
                        <Link to="/authors">{item.name}</Link>
                      </div>
                    </div>
                  </div>
                  <div className="product-price flex">
                    <div className="title"> Strength 💪: {item.strength}</div>
                    <div className="price">
                      <Button variant="secondary" onClick={() => handlePokemonDetails(item)}>
                        <FontAwesomeIcon icon={faPlus} className="heart-icon" /> Plus
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Modal show={showOverlay} onHide={toggleOverlay} centered>
          {selectedPokemon && (
            <>
              {/* ...other details... */}
              <div className="sc-product-item style-2">
                <div className="product-img">
                  <img src={selectedPokemon.img} alt="Bidzen" />
                  <div>
                    <label>{selectedPokemon.pokemonTypes}</label>
                  </div>
                </div>
                <div className="product-content">
                  <h5 className="title">
                    <Link to="#">{selectedPokemon.title}</Link>
                  </h5>
                  <div className="product-author flex">
                    <div className="name"></div>
                    <div className="infor">
                      <div className="author-name">
                        <Link to="#">{selectedPokemon.name}</Link>
                      </div>
                      <div>
                        <span> Experience: {selectedPokemon.baseExperience}</span>
                      </div>
                      <div>
                        <span>Weight: {selectedPokemon.weight}</span>
                      </div>
                      <div>
                        <span>Height: {selectedPokemon.height}</span>
                      </div>
                    </div>
                  </div>
                  <div className="product-price flex">
                    <div className="title">💪 strength: {selectedPokemon.strength}</div>
                  </div>
                </div>
              </div>
            </>
          )}
          <Modal.Footer style={{ backgroundColor: '#ffffff00' }}>
            <Button variant="secondary" onClick={toggleOverlay}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <div className="row justify-content-center mt-4">
          <ul className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <li
                key={index}
                className={`page-item ${activePage === index + 1 ? 'active' : ''}`}
                style={{ margin: '5px' }}
              >
                <button
                  className="page-link bg-violet"
                  onClick={() => handlePageSelect(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default PokedexCollections;
