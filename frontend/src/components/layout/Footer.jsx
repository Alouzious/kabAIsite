import React, { useState, useEffect } from 'react';
import './Footer.css';

const Footer = ({ siteSettings = {}, contactInfo = {} }) => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    });
  };

  return (
    <footer>   
      <div className="footer-top">     
        <h5>🤖 KUAI Club – Kabale University</h5>     
        <p>Empowering the next generation of AI innovators at KU.</p>   
      </div>    
      
      <div className="footer-columns">     
        {/* QUICK LINKS */}     
        <div className="footer-section">       
          <h6>⚡ QUICK LINKS</h6>       
          <ul>         
            {siteSettings.quick_links && siteSettings.quick_links.length > 0 ? (
              siteSettings.quick_links.map((link, index) => (
                <li key={index}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.name}
                  </a>
                </li>
              ))
            ) : (
              <li><span className="text-muted">No links yet</span></li>
            )}
          </ul>     
        </div>      

        {/* CONTACT US */}     
        <div className="footer-section">       
          <h6>📞 CONTACT US</h6>       
          {contactInfo.address && (
            <p className="contact-item">{contactInfo.address}</p>
          )}
          {contactInfo.email && (
            <p className="contact-item">
              📧 <a href={`mailto:${contactInfo.email}`} className="contact-link">
                {contactInfo.email}
              </a>
            </p>
          )}
          {contactInfo.phone && (
            <p className="contact-item">
              ☎ <a href={`tel:${contactInfo.phone}`} className="contact-link">
                {contactInfo.phone}
              </a>
            </p>
          )}
        </div>      

        {/* FOLLOW US */}     
        <div className="footer-section">       
          <h6>🌐 FOLLOW US</h6>       
          <ul className="social-links">
            {siteSettings.facebook_url && (
              <li>
                <a href={siteSettings.facebook_url} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook-f"></i> Facebook
                </a>
              </li>
            )}
            {siteSettings.twitter_url && (
              <li>
                <a href={siteSettings.twitter_url} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-twitter"></i> Twitter
                </a>
              </li>
            )}
            {siteSettings.instagram_url && (
              <li>
                <a href={siteSettings.instagram_url} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram"></i> Instagram
                </a>
              </li>
            )}
            {siteSettings.linkedin_url && (
              <li>
                <a href={siteSettings.linkedin_url} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin-in"></i> LinkedIn
                </a>
              </li>
            )}
            {siteSettings.youtube_url && (
              <li>
                <a href={siteSettings.youtube_url} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-youtube"></i> YouTube
                </a>
              </li>
            )}
            {siteSettings.whatsapp_url && (
              <li>
                <a href={siteSettings.whatsapp_url} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-whatsapp"></i> WhatsApp
                </a>
              </li>
            )}
          </ul>    
        </div>   
      </div>    

      {/* Footer Bottom */}   
      <div className="footer-bottom">     
        <div className="footer-divider"></div>
        <a 
          href="#" 
          className="back-to-top" 
          onClick={scrollToTop}
          style={{ opacity: showBackToTop ? '1' : '0.7' }}
        >
          <span className="back-to-top-icon">⬆</span> Back to Top
        </a>     
        <p className="copyright">© 2025 KUAI Club. All rights reserved.</p>     
        <p className="designer-credit">
          Designed with <span className="heart">❤️</span> by <strong>Alouzious</strong>
        </p>   
      </div> 
    </footer>
  );
};

export default Footer;