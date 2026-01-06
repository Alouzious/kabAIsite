import React, { useState, useEffect, useRef } from 'react';
import './HeroSlider.css';

const HeroSlider = ({ heroSlides = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef(null);

  // Auto-play carousel
  useEffect(() => {
    if (heroSlides.length > 1) {
      intervalRef.current = setInterval(() => {
        nextSlide();
      }, 5000); // Change slide every 5 seconds

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [currentSlide, heroSlides.length]);

  const nextSlide = () => {
    if (!isAnimating && heroSlides.length > 0) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      setTimeout(() => setIsAnimating(false), 800);
    }
  };

  const prevSlide = () => {
    if (!isAnimating && heroSlides.length > 0) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
      setTimeout(() => setIsAnimating(false), 800);
    }
  };

  const goToSlide = (index) => {
    if (!isAnimating && heroSlides.length > 0) {
      setIsAnimating(true);
      setCurrentSlide(index);
      setTimeout(() => setIsAnimating(false), 800);
    }
  };

  if (!heroSlides || heroSlides.length === 0) {
    return null;
  }

  return (
    <section className="hero-section">
      <div id="heroCarousel" className="carousel slide">
        {/* Indicators */}
        <div className="carousel-indicators">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goToSlide(index)}
              className={currentSlide === index ? 'active' : ''}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Slides */}
        <div className="carousel-inner">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`carousel-item ${currentSlide === index ? 'active' : ''}`}
            >
              <div
                className="hero-slide"
                style={{ backgroundImage: `url('${slide.image}')` }}
              >
                <div className="hero-overlay"></div>
                <div className="container">
                  <div className="row align-items-center min-vh-100">
                    <div className="col-lg-8 mx-auto text-center">
                      <div className="hero-content">
                        <h1 className="hero-title">{slide.title}</h1>
                        {slide.subtitle && (
                          <h3 className="hero-subtitle">{slide.subtitle}</h3>
                        )}
                        <div className="hero-buttons mt-4">
                          {slide.button1_text && (
                            <a
                              href={slide.button1_url || '#'}
                              className={`btn btn-${slide.button1_style || 'primary'} btn-lg me-3`}
                            >
                              {slide.button1_text}
                            </a>
                          )}
                          {slide.button2_text && (
                            <a
                              href={slide.button2_url || '#'}
                              className={`btn btn-${slide.button2_style || 'outline-light'} btn-lg`}
                            >
                              {slide.button2_text}
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Controls */}
        {heroSlides.length > 1 && (
          <>
            <button
              className="carousel-control-prev"
              id="button1"
              type="button"
              onClick={prevSlide}
            >
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              id="button2"
              type="button"
              onClick={nextSlide}
            >
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default HeroSlider;