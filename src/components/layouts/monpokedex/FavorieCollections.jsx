import React, {  useState } from 'react';
import { Link } from 'react-router-dom';

const FavorieCollections = (props) => {
  const data = props.data;
  const handleToggleFavorite = props.handleToggleFavorite;

  const itemsPerPage = 3; // Nombre d'éléments par page
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(1);

  // Fonction pour changer de page
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Récupérer les éléments de la page courante
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);

  return (
    <section className="latest-collections tf-section bg-color-3">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="sc-heading style-2">
              <div className="content-left">
                <div className="inner">
                  <h3>Mes Favorites</h3>
                </div>
              </div>
              <div className="content-right">
                <ul className="pagination">
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <li
                      key={index}
                      className={`pagination-item ${currentPage === index + 1 ? 'active' : ''}`}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="col-md-12">
            <div className="row card-grid">
              {currentItems.map((item, index) => (
                <CollectionsItem key={index} item={item} handleToggleFavorite={handleToggleFavorite} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
const CollectionsItem = (props) => {
    if (!props.item) {
      return null; // Ou un rendu alternatif pour gérer le cas où props.item est undefined
    }
  
    return (
      <div className="slider-item col-md-4">
        <div className="sc-product-item style-4">
          <div className="product-img flex">
            <div className="img-left">
              <img src={props.item.img} alt="Bidzen" />
              <label>{props.item.tags}</label>
            </div>
          </div>
          <div className="product-content">
            <h5 className="title">
              <Link to="/item-details">{props.item.title}</Link>{' '}
            </h5>
            <div className="product-author flex mg-bt-0">
              <div className="left flex">
                <div className="avatar">
                  <img src={props.item.imgAuthor} alt="Bidzen" />
                </div>
                <div className="infor">
                  <div className="author-name">
                    <Link to="/authors">{props.item.name}</Link>
                  </div>
                  <span>Creator</span>
                </div>
              </div>
              <div className="button-wishlish">
                <button className="wishlish" onClick={() => props.handleToggleFavorite(props.item.name)}>
                  <i className="fas fa-trash-alt"></i>
                </button>
                <span>{props.item.wishlist}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
export default FavorieCollections;
