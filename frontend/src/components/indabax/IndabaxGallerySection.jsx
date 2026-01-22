import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './IndabaxGallery.css';

const IndabaxGallerySection = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    axios.get('/api/indabax/gallery/')
      .then(res => {
        setImages(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load gallery.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading gallery...</div>;
  if (error) return <div>{error}</div>;
  if (!images.length) return <div>No gallery images found.</div>;
  return (
    <section className="indabax-gallery">
      <h2>Gallery</h2>
      <div className="gallery-list">
        {images.map(img => (
          <div key={img.id} className="gallery-card">
            {img.image_url && <img src={img.image_url} alt={img.title} className="gallery-img" />}
            <h4>{img.title}</h4>
            <p>{img.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default IndabaxGallerySection;
