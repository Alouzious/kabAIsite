import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './IndabaxAbout.css';

const IndabaxAboutSection = () => {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    axios.get('/api/indabax/settings/current/')
      .then(res => {
        setAbout(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load about section.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading about section...</div>;
  if (error) return <div>{error}</div>;
  if (!about) return <div>No about info found.</div>;
  return (
    <section className="indabax-about">
      <h2>{about.about_title}</h2>
      <p>{about.about_description}</p>
      {about.about_image_url && <img src={about.about_image_url} alt="About Indabax" className="about-img" />}
    </section>
  );
};

export default IndabaxAboutSection;
