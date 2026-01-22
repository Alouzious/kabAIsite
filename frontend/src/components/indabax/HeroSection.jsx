import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './IndabaxHero.css';

const HeroSection = () => {
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    axios.get('/api/indabax/hero/')
      .then(res => {
        if (res.data.length > 0) setHero(res.data.find(h => h.is_active) || res.data[0]);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load hero section.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading hero section...</div>;
  if (error) return <div>{error}</div>;
  if (!hero) return <div>No hero section found.</div>;
  return (
    <section className="indabax-hero">
      {hero.image_url && <img src={hero.image_url} alt={hero.title} className="indabax-hero-img" />}
      <div className="indabax-hero-content">
        <h1>{hero.title}</h1>
        <p>{hero.description}</p>
      </div>
    </section>
  );
};

export default HeroSection;
