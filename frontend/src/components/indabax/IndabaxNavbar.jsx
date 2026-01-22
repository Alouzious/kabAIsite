import React from 'react';
import { Link } from 'react-router-dom';
import './IndabaxNavbar.css';

const IndabaxNavbar = () => (
  <nav className="indabax-navbar">
    <ul>
      <li><Link to="/indabax">Home</Link></li>
      <li><Link to="/indabax/leaders">Leaders</Link></li>
      <li><Link to="/indabax/gallery">Gallery</Link></li>
      <li><Link to="/indabax/about">About</Link></li>
    </ul>
  </nav>
);

export default IndabaxNavbar;
