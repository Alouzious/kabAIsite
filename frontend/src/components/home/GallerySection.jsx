import React, { useState, useEffect, useRef } from 'react';
import './GallerySection.css';

const GallerySection = ({ initialGallery = [] }) => {
  const [gallery, setGallery] = useState(initialGallery);
  const [showExtra, setShowExtra] = useState(false);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const extraGalleryRef = useRef(null);
  const mainGalleryRef = useRef(null);

  // Fetch gallery from API
  useEffect(() => {
    if (initialGallery. length === 0) {
      fetchGallery();
    }
  }, []);

  const fetchGallery = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/gallery/`);
      const data = await response.json();
      setGallery(data);
    } catch (error) {
      console.error('Error fetching gallery:', error);
    }
  };

  // Intersection Observer for fade-in animation
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin:  '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const items = document.querySelectorAll('.gallery-item');
    items.forEach(item => observer.observe(item));

    return () => observer.disconnect();
  }, [gallery, showExtra]);

  const handleShowMore = () => {
    setShowExtra(true);
    setTimeout(() => {
      extraGalleryRef. current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleHide = () => {
    mainGalleryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => {
      setShowExtra(false);
    }, 300);
  };

  const handleImageLoad = (imageId) => {
    setLoadedImages(prev => new Set([...prev, imageId]));
  };

  const handleImageClick = (imageUrl) => {
    window.open(imageUrl, '_blank');
  };

  const mainImages = gallery.slice(0, 4);
  const extraImages = gallery. slice(4);
  const hasMore = gallery.length > 4;

  if (gallery.length === 0) {
    return (
      <section className="gallery-section">
        <h2 className="gallery-title">Latest Gallery</h2>
        <div className="gallery-no-data">
          <p>No images available in the gallery yet.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="gallery-section" className="gallery-section">
      <h2 className="gallery-title">Latest Gallery</h2>

      {/* Main Gallery */}
      <div id="main-gallery" className="gallery-wrapper" ref={mainGalleryRef}>
        {mainImages.map((image) => (
          <div
            key={image.id}
            className={`gallery-item ${!loadedImages.has(image. id) ? 'loading' : ''}`}
            onClick={() => handleImageClick(image.image)}
          >
            <img
              src={image.image}
              alt={image.title || 'Gallery image'}
              loading="lazy"
              onLoad={() => handleImageLoad(image.id)}
              onError={() => handleImageLoad(image.id)}
            />
          </div>
        ))}

        {/* Show More Button */}
        {hasMore && ! showExtra && (
          <div className="more-btn-container">
            <button
              id="show-more-btn"
              className="gallery-btn gallery-btn-primary small-btn"
              onClick={handleShowMore}
              aria-expanded={showExtra}
              aria-controls="extra-gallery"
            >
              + More
            </button>
          </div>
        )}
      </div>

      {/* Extra Gallery */}
      {hasMore && showExtra && (
        <div
          id="extra-gallery"
          className={`gallery-wrapper extra-gallery ${showExtra ? 'show' : ''}`}
          ref={extraGalleryRef}
          aria-hidden={! showExtra}
        >
          {extraImages.map((image) => (
            <div
              key={image.id}
              className={`gallery-item ${!loadedImages.has(image. id) ? 'loading' : ''}`}
              onClick={() => handleImageClick(image.image)}
            >
              <img
                src={image.image}
                alt={image.title || 'Gallery image'}
                loading="lazy"
                onLoad={() => handleImageLoad(image.id)}
                onError={() => handleImageLoad(image.id)}
              />
            </div>
          ))}

          {/* Hide Button */}
          <div className="hide-btn-container">
            <button
              id="hide-gallery-btn"
              className="gallery-btn gallery-btn-secondary hide-btn small-btn"
              onClick={handleHide}
            >
              Hide
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;