import React, { useState, useEffect } from 'react';
import './TeamSection.css';

const TeamSection = ({ initialLeaders = [], categories = [] }) => {
  const [leaders, setLeaders] = useState(initialLeaders);
  const [activeCategory, setActiveCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch leaders from API when component mounts
  useEffect(() => {
    if (initialLeaders.length === 0) {
      fetchLeaders();
    }
  }, []);

  const fetchLeaders = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/leaders/current/`);
      const data = await response.json();
      setLeaders(data);
    } catch (error) {
      console.error('Error fetching leaders:', error);
    } finally {
      setLoading(false);
    }
  };

  // Toggle social links for a specific leader card
  const toggleSocial = (leaderId) => {
    setActiveCategory(activeCategory === leaderId ?  null : leaderId);
  };

  // Close social links when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (! event.target.closest('.leader-social-toggle') && 
          !event. target.closest('.leader-social-links')) {
        setActiveCategory(null);
      }
    };

    document. addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Group leaders by category
  const groupedLeaders = categories.map(category => ({
    ... category,
    leaders: leaders. filter(leader => leader.category === category.key)
  })).filter(group => group.leaders.length > 0);

  const LeaderCard = ({ leader }) => (
    <div className="leader-card">
      {/* Social Toggle Button */}
      <div 
        className={`leader-social-toggle ${activeCategory === leader.id ? 'active' : ''}`}
        onClick={() => toggleSocial(leader. id)}
      >
        <i className={`fas ${activeCategory === leader.id ? 'fa-times' : 'fa-plus'}`}></i>
      </div>

      {/* Social Links Dropdown */}
      <div className={`leader-social-links ${activeCategory === leader.id ? 'active' : ''}`}>
        {leader.email && (
          <a href={`mailto:${leader.email}`} className="leader-social-link email">
            <i className="fas fa-envelope"></i>
          </a>
        )}
        {leader.linkedin_url && (
          <a href={leader.linkedin_url} className="leader-social-link linkedin" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin-in"></i>
          </a>
        )}
        {leader.github_url && (
          <a href={leader.github_url} className="leader-social-link github" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i>
          </a>
        )}
        {leader.personal_website && (
          <a href={leader.personal_website} className="leader-social-link website" target="_blank" rel="noopener noreferrer">
            <i className="fas fa-globe"></i>
          </a>
        )}
        {leader.phone && (
          <a href={`tel:${leader.phone}`} className="leader-social-link phone">
            <i className="fas fa-phone"></i>
          </a>
        )}
      </div>

      {/* Leader Photo */}
      <div className="leader-photo">
        {leader.photo ? (
          <img src={leader.photo} alt={leader.full_name} loading="lazy" />
        ) : (
          <div className="leader-placeholder-photo">
            {leader.full_name. charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      {/* Leader Info */}
      <h4 className="leader-name">{leader.full_name}</h4>
      <p className="leader-position">{leader.position}</p>
      <p className="leader-bio">
        {leader.bio && leader.bio.length > 120 
          ? `${leader.bio.substring(0, 120)}...` 
          : leader.bio}
      </p>
    </div>
  );

  if (loading) {
    return (
      <section className="leaders-section">
        <div className="leaders-loading">
          <div className="spinner"></div>
          <p>Loading team members...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="leaders-section" className="leaders-section">
      {/* Section Header */}
      <div className="leaders-section-header">
        <div className="leaders-section-subtitle">TEAM MEMBERS</div>
        <h2 className="leaders-section-title">
          Meet our<br />
          Professional team of<br />
          experts
        </h2>
        <p className="leaders-section-description">
          Our dedicated team of leaders and experts are committed to driving innovation and excellence in everything we do. 
        </p>
      </div>

      {/* Categories */}
      {groupedLeaders.length > 0 ?  (
        groupedLeaders.map((group) => (
          <div key={group.key} id={`category-${group.key}`} className="leaders-category-section">
            <h3 className="leaders-category-title">{group. label}</h3>
            
            {/* Leaders Grid */}
            <div className="leaders-grid">
              {group.leaders. map((leader) => (
                <LeaderCard key={leader.id} leader={leader} />
              ))}
            </div>

            {/* View Previous Leaders Button */}
            <div className="leaders-view-previous">
              <a 
                href={`/previous-leaders/${group.key}`} 
                className="leaders-view-previous-btn"
              >
                View Previous {group.label}
              </a>
            </div>
          </div>
        ))
      ) : (
        <div className="leaders-no-data">
          <p>No team members to display at the moment.</p>
        </div>
      )}
    </section>
  );
};

export default TeamSection;