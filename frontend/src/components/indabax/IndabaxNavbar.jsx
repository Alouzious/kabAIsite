import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './IndabaxNavbar.css';

const IndabaxNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="indabax-navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/indabax">
            <span className="brand-text">IndabaX Kabale</span>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="navbar-toggle" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        {/* Navigation Links */}
        <ul className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          <li className={isActive('/indabax')}>
            <Link to="/indabax" onClick={() => setIsOpen(false)}>Home</Link>
          </li>
          <li className={isActive('/indabax/about')}>
            <Link to="/indabax/about" onClick={() => setIsOpen(false)}>About Us</Link>
          </li>
          <li className={isActive('/indabax/leaders')}>
            <Link to="/indabax/leaders" onClick={() => setIsOpen(false)}>Leaders</Link>
          </li>
          <li className={isActive('/indabax/events')}>
            <Link to="/indabax/events" onClick={() => setIsOpen(false)}>Events</Link>
          </li>
          <li className={isActive('/indabax/news')}>
            <Link to="/indabax/news" onClick={() => setIsOpen(false)}>News</Link>
          </li>
          <li className={isActive('/indabax/research')}>
            <Link to="/indabax/research" onClick={() => setIsOpen(false)}>Research</Link>
          </li>
          <li className={isActive('/indabax/resources')}>
            <Link to="/indabax/resources" onClick={() => setIsOpen(false)}>Resources</Link>
          </li>
          <li className={isActive('/indabax/gallery')}>
            <Link to="/indabax/gallery" onClick={() => setIsOpen(false)}>Gallery</Link>
          </li>
          <li className={isActive('/indabax/KabAIClub')}>
            <Link to="/indabax/communities" onClick={() => setIsOpen(false)}>KabAIClub</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default IndabaxNavbar;