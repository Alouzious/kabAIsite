import React from 'react';
import SEO from '../components/layout/SEO';
import IndabaxNavbar from '../components/indabax/IndabaxNavbar';
import '../components/indabax/IndabaxNavbar.css';
import IndabaxFooter from '../components/layout/IndabaxFooter';
import '../components/layout/IndabaxFooter.css';
import HeroSection from '../components/indabax/HeroSection';
import LeadersSection from '../components/indabax/LeadersSection';
import IndabaxGallerySection from '../components/indabax/IndabaxGallerySection';
import LearningResourcesSection from '../components/indabax/LearningResourcesSection';
import '../components/indabax/LearningResourcesSection.css';
import IndabaxAboutSection from '../components/indabax/IndabaxAboutSection';
import '../components/indabax/IndabaxHero.css';
import '../components/indabax/LeadersSection.css';



const siteName = process.env.REACT_APP_SITE_NAME || 'KUAI Club';
const siteDescription = 'Indabax Kabale - AI, research, and innovation at Kabale University.';
const siteKeywords = process.env.REACT_APP_SITE_KEYWORDS || 'Indabax, AI, Kabale, Uganda, Research, Events, Gallery, Leaders, Resources';
const siteUrl = process.env.REACT_APP_SITE_URL || 'http://localhost:3000/communities/indabax';

const IndabaxHome = () => (
  <>
    <SEO
      title={siteName + ' | Indabax Kabale'}
      description={siteDescription}
      keywords={siteKeywords}
      canonical={siteUrl + '/communities/indabax'}
    />
    <div>
      <IndabaxNavbar />
      <div id="hero"><HeroSection /></div>
      <div id="about"><IndabaxAboutSection /></div>
      <div id="leaders"><LeadersSection /></div>
      <div id="gallery"><IndabaxGallerySection /></div>
      <div id="resources"><LearningResourcesSection /></div>
      <IndabaxFooter />
    </div>
  </>
);

export default IndabaxHome;
