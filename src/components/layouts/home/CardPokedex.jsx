import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Form, Offcanvas } from 'react-bootstrap';
import { Modal, Button } from 'react-bootstrap';

const PokedexCollections = (props) => {
  const {
    data,
    handleToggleFavorite,
    isFavorite,
    handleSearch,
    searchTerm,
    type,
    handleTypeSelect,
  } = props;

  // Pagination
  const itemsPerPage = 6;
  const [activePage, setActivePage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (activePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);
  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const toggleOverlay = () => {
    setShowOverlay(!showOverlay);
  };

  const toggleOffcanvas = () => {
    setShowOffcanvas(!showOffcanvas);
  };

  const handlePageSelect = (page) => {
    setActivePage(page);
  };

  const handlePokemonDetails = (pokemon) => {
    setSelectedPokemon(pokemon);
    toggleOverlay();
  };
  console.log(selectedPokemon)

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
                <button className="btn-selector nolink" onClick={toggleOffcanvas}>
                  <span>Type</span>
                </button>
                <Offcanvas show={showOffcanvas} onHide={toggleOffcanvas}  placement="top">
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Type</Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <Form>
                      {type.map((type, index) => (
                        <Form.Check
                          key={index}
                          type="checkbox"
                          id={`type-checkbox-${index}`}
                          label={type}
                          onChange={() => handleTypeSelect(type)}
                        />
                      ))}
                    </Form>
                  </Offcanvas.Body>
                </Offcanvas>
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
          {paginatedData.map((item, index) => (
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
                    <div className="title">💪 strength: {item.strength}</div>
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

        {/* Modal Overlay */}
        <Modal show={showOverlay} onHide={toggleOverlay} centered >
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
                        <span> baseExperience: {selectedPokemon.baseExperience} ⭐</span>
                      </div>
                      <div>
                        <span>weight: {selectedPokemon.weight} 🏋️</span>
                      </div>
                      <div>
                        <span>height: {selectedPokemon.height} 📏</span>
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

        {/* Pagination */}
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
