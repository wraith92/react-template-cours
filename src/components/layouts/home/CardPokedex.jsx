import React from 'react';
import { Link } from 'react-router-dom';

const PokedexCollections = props => {
  const data = props.data;

  return (
    <section className="tf-trendy-collections tf-section">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="sc-heading style-2">
              <div className="content-left">
                <div className="inner">
                  <h3>Pokedex Collection</h3>
                  <p className="desc">Projet (ABDERRAHMAN AHMED MOHAMED HASANE)</p>
                </div>
              </div>
            </div>
            <div className="row align-items-center">
              <div className="col">
                <form className="form-search">
                  <input type="text" placeholder="Search here" />
                </form>
              </div>
              <div className="col-auto">
                <button ><i className="far fa-search"></i></button>
              </div>
            </div>

          </div>
        </div>

        <div className="row trendy">
          {data.map((item, index) => (
            <div key={index} className="col-lg-4 col-md-6 col-12">
              <div className="sc-product-item style-2">
                <div className="product-img">
                  <img src={item.img} alt="Bidzen" />
                  <Link to="/connect-wallet" className="sc-button style letter"><span>plus</span></Link>
                  <label>{item.pokemonTypes}</label>
                </div>
                <div className="product-content">
                  <h5 className="title"><Link to="/item-details">{item.title}</Link></h5>
                  <div className="product-author flex">
                    <div className="avatar">
                      <span>{item.getTypeIcon}</span>
                    </div>
                    <div className="infor">
                      <div className="author-name"><Link to="/authors">{item.name}</Link></div>
                      <span>weight: {item.weight} 🏋️</span>
                      <br />
                      <span>height: {item.height} 📏</span>
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
      </div>
    </section>
  );
};

export default PokedexCollections;
