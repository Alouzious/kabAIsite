import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ 
  siteSettings = {}, 
  aboutPages = [], 
  news = [], 
  events = [], 
  research = [], 
  resources = [], 
  community = [], 
  projects = [] 
}) => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle dropdown hover
  const handleMouseEnter = (dropdownId) => {
    setActiveDropdown(dropdownId);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // Implement your search logic here
      setSearchModalOpen(false);
      setSearchQuery('');
    }
  };

  // Handle section scroll
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Top Site Content */}
      <div className="top_site_content py-2">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-start">
              {siteSettings.contact_email && (
                <span>
                  <i className="fa-solid fa-envelope me-1 text-primary"></i>
                  <a href={`mailto:${siteSettings.contact_email}`} className="contact-link text-primary">
                    {siteSettings.contact_email}
                  </a>
                </span>
              )}
              {siteSettings.contact_phone && (
                <span className="ms-3">
                  <i className="fa-solid fa-phone me-1 text-primary"></i>
                  <a href={`tel:${siteSettings.contact_phone}`} className="contact-link text-primary">
                    {siteSettings.contact_phone}
                  </a>
                </span>
              )}
            </div>

            <div className="col-md-6 d-flex justify-content-end align-items-center gap-3">
              {/* Social Media Icons */}
              <div className="social-media-links d-flex align-items-center gap-2">
                {siteSettings.facebook_url && (
                  <a href={siteSettings.facebook_url} target="_blank" rel="noopener noreferrer" className="text-black social-link">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                )}
                {siteSettings.twitter_url && (
                  <a href={siteSettings.twitter_url} target="_blank" rel="noopener noreferrer" className="text-black social-link">
                    <i className="fab fa-twitter"></i>
                  </a>
                )}
                {siteSettings.instagram_url && (
                  <a href={siteSettings.instagram_url} target="_blank" rel="noopener noreferrer" className="text-black social-link">
                    <i className="fab fa-instagram"></i>
                  </a>
                )}
                {siteSettings.linkedin_url && (
                  <a href={siteSettings.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-black social-link">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                )}
                {siteSettings.youtube_url && (
                  <a href={siteSettings.youtube_url} target="_blank" rel="noopener noreferrer" className="text-black social-link">
                    <i className="fab fa-youtube"></i>
                  </a>
                )}
                {siteSettings.whatsapp_url && (
                  <a href={siteSettings.whatsapp_url} target="_blank" rel="noopener noreferrer" className="text-black social-link">
                    <i className="fab fa-whatsapp"></i>
                  </a>
                )}
              </div>

              {/* Quick Links Dropdown */}
              {siteSettings.quick_links && siteSettings.quick_links.length > 0 && (
                <div className="dropdown">
                  <button className="btn btn-sm btn-outline-dark dropdown-toggle" data-bs-toggle="dropdown">
                    Quick Links
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end quick-links-dropdown">
                    {siteSettings.quick_links.map((link, index) => (
                      <li key={index}>
                        <a className="dropdown-item" href={link.url} target="_blank" rel="noopener noreferrer">
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`navbar navbar-expand-lg navbar-dark bg-primary sticky-top ${scrolled ? 'scrolled' : ''}`}>
        <div className="container-fluid">
          {/* Mobile Toggle */}
          <button 
            className="navbar-toggler" 
            type="button" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navigation Links */}
          <div className={`collapse navbar-collapse justify-content-center ${isMobileMenuOpen ? 'show' : ''}`}>
            <ul className="navbar-nav d-flex flex-row">
              
              {/* Home */}
              <li className="nav-item">
                <Link 
                  className={`nav-link ${isActive('/') ? 'active' : ''}`} 
                  to="/"
                >
                  Home
                </Link>
              </li>

              {/* About Us */}
              <li 
                className="nav-item nav-hover-content" 
                onMouseEnter={() => handleMouseEnter('about')}
                onMouseLeave={handleMouseLeave}
              >
                <Link to="/about" className="nav-link">About Us</Link>
                
                {/* About Dropdown */}
                {activeDropdown === 'about' && aboutPages.length > 0 && (
                  <div 
                    className="hover-content-panel show"
                    onMouseEnter={() => setActiveDropdown('about')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="container">
                      <div className="row">
                        <div className="col-md-6">
                          <h6 className="dropdown-header">WHO WE ARE</h6>
                          <ul className="list-unstyled">
                            {aboutPages.filter(page => page.column_position === 'left').map(page => (
                              <li key={page.id}>
                                <Link to={`/about#${page.title.toLowerCase().replace(/\s+/g, '-')}`}>
                                  {page.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="col-md-6">
                          <h6 className="dropdown-header">WHY WE EXIST</h6>
                          <ul className="list-unstyled">
                            {aboutPages.filter(page => page.column_position === 'right').map(page => (
                              <li key={page.id}>
                                <Link to={`/about#${page.title.toLowerCase().replace(/\s+/g, '-')}`}>
                                  {page.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </li>

              {/* Leaders */}
              <li 
                className="nav-item nav-hover-content"
                onMouseEnter={() => handleMouseEnter('leaders')}
                onMouseLeave={handleMouseLeave}
              >
                <a 
                  href="#team-section" 
                  className="nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('team-section');
                  }}
                >
                  Leaders
                </a>
                
                {activeDropdown === 'leaders' && (
                  <div 
                    className="hover-content-panel show"
                    onMouseEnter={() => setActiveDropdown('leaders')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <ul className="list-unstyled mb-0">
                      <li><a href="#category-student">Student Leaders</a></li>
                      <li><a href="#category-faculty">Faculty Mentors</a></li>
                    </ul>
                  </div>
                )}
              </li>

              {/* News */}
              <li 
                className="nav-item nav-hover-content"
                onMouseEnter={() => handleMouseEnter('news')}
                onMouseLeave={handleMouseLeave}
              >
                <a 
                  href="#news-section" 
                  className="nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('news-section');
                  }}
                >
                  News
                </a>
                
                {activeDropdown === 'news' && (
                  <div 
                    className="hover-content-panel show"
                    onMouseEnter={() => setActiveDropdown('news')}
                    onMouseLeave={handleMouseLeave}
                  >
                    {news && news.length > 0 ? (
                      <ul className="list-unstyled mb-0">
                        {news.map(item => (
                          <li key={item.id} className="d-flex align-items-start mb-3">
                            {item.image && (
                              <img 
                                src={item.image} 
                                alt={item.title} 
                                style={{width:'50px', height:'50px', objectFit:'cover', borderRadius:'4px', marginRight:'10px'}}
                              />
                            )}
                            <div>
                              <a href={`#news-section-${item.slug}`} className="fw-bold text-dark text-decoration-none">
                                {item.title}
                              </a>
                              <p className="mb-0 text-muted" style={{fontSize: '0.85rem'}}>
                                {item.summary?.substring(0, 60)}...
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-muted text-center py-3">
                        <i className="bi bi-info-circle" style={{fontSize: '1.2rem'}}></i><br />
                        No news updates available at the moment.
                      </div>
                    )}
                  </div>
                )}
              </li>

              {/* Events */}
              <li 
                className="nav-item nav-hover-content"
                onMouseEnter={() => handleMouseEnter('events')}
                onMouseLeave={handleMouseLeave}
              >
                <a 
                  href="#event-section" 
                  className="nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('event-section');
                  }}
                >
                  Events
                </a>
                
                {activeDropdown === 'events' && (
                  <div 
                    className="hover-content-panel show"
                    onMouseEnter={() => setActiveDropdown('events')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <ul className="list-unstyled">
                      {events && events.length > 0 ? (
                        events.map(event => (
                          <li key={event.id}>
                            <a href={`#event-section-${event.slug}`}>{event.title}</a>
                          </li>
                        ))
                      ) : (
                        <li><em>No upcoming events available</em></li>
                      )}
                    </ul>
                  </div>
                )}
              </li>

              {/* Research */}
              <li 
                className="nav-item nav-hover-content"
                onMouseEnter={() => handleMouseEnter('research')}
                onMouseLeave={handleMouseLeave}
              >
                {research && research.length > 0 ? (
                  <Link to={`/research/${research[0].id}`} className="nav-link">Research</Link>
                ) : (
                  <a href="#" className="nav-link">Research</a>
                )}
                
                {activeDropdown === 'research' && research && research.length > 0 && (
                  <div 
                    className="hover-content-panel show"
                    onMouseEnter={() => setActiveDropdown('research')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <ul className="list-unstyled">
                      {research.map(item => (
                        <li key={item.id}>
                          <Link to={`/research/${item.id}`}>{item.title}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>

              {/* Resources */}
              <li 
                className="nav-item nav-hover-content"
                onMouseEnter={() => handleMouseEnter('resources')}
                onMouseLeave={handleMouseLeave}
              >
                <a href="#" className="nav-link">Resources</a>
                
                {activeDropdown === 'resources' && resources && resources.length > 0 && (
                  <div 
                    className="hover-content-panel show"
                    onMouseEnter={() => setActiveDropdown('resources')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="row">
                      <div className="col-md-6">
                        <h6 className="dropdown-header">LEARNING RESOURCES</h6>
                        <ul className="list-unstyled">
                          {resources.filter(r => r.resource_type === 'learning').map(resource => (
                            <li key={resource.id}>
                              <Link to={`/resource/${resource.id}`}>{resource.title}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="col-md-6">
                        <h6 className="dropdown-header">TOOLS & DOWNLOADS</h6>
                        <ul className="list-unstyled">
                          {resources.filter(r => r.resource_type === 'tool').map(resource => (
                            <li key={resource.id}>
                              <Link to={`/resource/${resource.id}`}>{resource.title}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </li>

              {/* Communities */}
              <li 
                className="nav-item nav-hover-content"
                onMouseEnter={() => handleMouseEnter('community')}
                onMouseLeave={handleMouseLeave}
              >
                <a href="#" className="nav-link">Communities</a>
                
                {activeDropdown === 'community' && community && community.length > 0 && (
                  <div 
                    className="hover-content-panel show"
                    onMouseEnter={() => setActiveDropdown('community')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <ul className="list-unstyled">
                      {community.map(outreach => (
                        <li key={outreach.id}>
                          <Link to="/communities/indabax">{outreach.title}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>

              {/* Projects */}
              <li 
                className="nav-item nav-hover-content"
                onMouseEnter={() => handleMouseEnter('projects')}
                onMouseLeave={handleMouseLeave}
              >
                <a 
                  href="#projects-section" 
                  className="nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('projects-section');
                  }}
                >
                  Projects
                </a>
                
                {activeDropdown === 'projects' && projects && projects.length > 0 && (
                  <div 
                    className="hover-content-panel show"
                    onMouseEnter={() => setActiveDropdown('projects')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <ul className="list-unstyled">
                      {projects.map(project => (
                        <li key={project.id}>
                          <Link to={`/project/${project.id}`}>{project.title}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>

              {/* Search Button */}
              <li className="nav-item">
                <button 
                  className="btn btn-outline-light ms-3" 
                  type="button" 
                  onClick={() => setSearchModalOpen(true)}
                >
                  <i className="fas fa-search"></i>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Search Modal */}
      {searchModalOpen && (
        <div className="modal fade show" style={{display: 'block'}} onClick={() => setSearchModalOpen(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Search</h5>
                <button type="button" className="btn-close" onClick={() => setSearchModalOpen(false)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSearch}>
                  <div className="input-group">
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Search..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                    />
                    <button className="btn btn-primary" type="submit">
                      <i className="fas fa-search"></i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {searchModalOpen && <div className="modal-backdrop fade show"></div>}
    </>
  );
};

export default Navbar;