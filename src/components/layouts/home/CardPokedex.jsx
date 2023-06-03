import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Dropdown } from 'react-bootstrap';

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
  const itemsPerPage = 9;
  const [activePage, setActivePage] = React.useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (activePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  const handlePageSelect = (page) => {
    setActivePage(page);
  };

  return (
    <section className="tf-trendy-collections tf-section">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="sc-heading style-2" style={{ marginBottom: '30px' }}>
              <div className="content-left">
                <div className="inner">
                  <h3>Pokedex Collection</h3>
                </div>
              </div>
              <div className="content-right">
                <Dropdown>
                  <Dropdown.Toggle className="btn-selector nolink" id="dropdown-basic">
                    <span>Type</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {type.map((type, index) => (
                      <Dropdown.Item href="#" key={index} onClick={() => handleTypeSelect(type)}>
                        <span>{type}</span>
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
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
                  <Link
                    to="#"
                    className="sc-button style d-flex justify-content-center align-items-center"
                    onClick={() => handleToggleFavorite(item.name)}
                  >
                    {isFavorite(item.name) ? (
                      <div>
                        <span>Remove</span>
                        <span className="mr-2">
                          <FontAwesomeIcon icon={faTimes} className="heart-icon" />
                        </span>
                      </div>
                    ) : (
                      <div>
                        <span>Ajouter</span>
                        <span className="mr-2">
                          <FontAwesomeIcon icon={faHeart} className="heart-icon" />
                        </span>
                      </div>
                    )}
                  </Link>
                  <label>{item.pokemonTypes}</label>
                </div>
                <div className="product-content">
                  <h5 className="title">
                    <Link to="/item-details">{item.title}</Link>
                  </h5>
                  <div className="product-author flex">
                    <div className="avatar">
                      <span>{item.getTypeIcon}</span>
                    </div>
                    <div className="infor">
                      <div className="author-name">
                        <Link to="/authors">{item.name}</Link>
                      </div>
                      <div>
                        <span>weight: {item.weight} 🏋️</span>
                        <span>height: {item.height} 📏</span>
                      </div>
                    </div>
                  </div>
                  <div className="product-price flex">
                    <div className="title">💪 strength: {item.strength}</div>
                    <div className="price">
                      <span>⭐ baseExperience: {item.baseExperience}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

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
