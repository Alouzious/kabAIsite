import React, { useState, useEffect, useRef } from 'react';
import './PartnersSection.css';

const PartnersSection = ({ initialPartners = [] }) => {
  const [partners, setPartners] = useState(initialPartners);
  const [loading, setLoading] = useState(false);
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  // Fetch partners from API
  useEffect(() => {
    if (initialPartners.length === 0) {
      fetchPartners();
    }
  }, []);

  const fetchPartners = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/partners/`);
      const data = await response.json();
      setPartners(data);
    } catch (error) {
      console.error('Error fetching partners:', error);
    } finally {
      setLoading(false);
    }
  };

  // Intersection Observer for scroll-triggered animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const animateCards = () => {
      cardsRef.current.forEach((card, index) => {
        if (card) {
          setTimeout(() => {
            card.classList.add('animate');
          }, index * 150);
        }
      });
    };

    const observer = new IntersectionObserver((entries) => {
      entries. forEach(entry => {
        if (entry.isIntersecting) {
          animateCards();
          observer.disconnect();
        }
      });
    }, observerOptions);

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [partners]);

  const handleWebsiteLinkClick = (partnerName, websiteUrl) => {
    // Optional: Add analytics tracking
    console.log('Partner website clicked:', websiteUrl, 'Partner:', partnerName);
  };

  const getPartnerTypeDisplay = (type) => {
    const typeMap = {
      'collaborator': 'Collaborator',
      'sponsor': 'Sponsor',
      'partner': 'Partner',
      'supporter': 'Supporter'
    };
    return typeMap[type] || type;
  };

  if (loading) {
    return (
      <section id="partners" className="partners-section">
        <div className="container">
          <div className="partners-loading">
            <div className="partners-spinner"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="partners" className="partners-section" ref={sectionRef}>
      <div className="container">
        <h2 className="partners-title">Our Partners</h2>

        <div className="partners-grid">
          {partners. length > 0 ? (
            partners.map((partner, index) => (
              <div
                key={partner.id}
                className="partner-col"
                ref={el => cardsRef.current[index] = el}
              >
                <div className="partner-card fade-in-up">
                  {partner.image && (
                    <a
                      href={partner.website_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="partner-image-link"
                    >
                      <img
                        src={partner.image}
                        className="partner-image"
                        alt={partner.name}
                        loading="lazy"
                      />
                    </a>
                  )}
                  <div className="partner-card-body">
                    <h6 className="partner-card-title">{partner.name}</h6>
                    <span className="partner-type">
                      {getPartnerTypeDisplay(partner.partner_type)}
                    </span>
                    {partner.description && (
                      <p className="partner-card-text">
                        {partner.description. split(' ').slice(0, 20).join(' ')}
                        {partner.description.split(' ').length > 20 ?  '...' : ''}
                      </p>
                    )}
                    {partner.website_link && (
                      <a
                        href={partner.website_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="partner-website-link"
                        onClick={() => handleWebsiteLinkClick(partner.name, partner. website_link)}
                      >
                        <span>Visit Website</span>
                        <i className="fas fa-external-link-alt"></i>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="partners-no-data">
              <p>No partners available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;