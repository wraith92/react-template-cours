import React from 'react';
import { Navigation, Scrollbar, A11y   } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

const Cardgame = props => {
    const selectedPokemon=props.selectedPokemon
        return  (
        <section className="tf-slider slider">
            <Swiper
                modules={[Navigation,  Scrollbar, A11y ]}
                    spaceBetween={0}
                    slidesPerView={1}
                    navigation
                    scrollbar={{ draggable: true }}
                >

                        <SwiperSlide >
                            <SliderItem  selectedPokemon={selectedPokemon}  />
                        </SwiperSlide>


            </Swiper>
        </section>
    )
};

const SliderItem = props => (
    <div className="swiper-container ">
        <div className="swiper-wrapper">
            <div className="swiper-slide">
                <div className="slider-item">
                    <div className="overlay"></div>
                    <div className="slider-inner flex home-1">
                    {props.selectedPokemon.map((pokemon, index) => (
              <div className="slider-img"key={index}>
              <div className="img-home-1">
                  <img src={pokemon.img} alt="Bidzen" />
                  {pokemon.name} - Health: {pokemon.health || 'Defeated'}

              </div>
          </div>
            ))}


                    </div>
                </div>
            </div>
        </div>
    </div>

)

export default Cardgame;
