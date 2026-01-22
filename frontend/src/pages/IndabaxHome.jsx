import React from 'react';
import IndabaxNavbar from '../components/indabax/IndabaxNavbar';
import HeroSection from '../components/indabax/HeroSection';
import LeadersSection from '../components/indabax/LeadersSection';
import IndabaxGallerySection from '../components/indabax/IndabaxGallerySection';
import LearningResourcesSection from '../components/indabax/LearningResourcesSection';
import '../components/indabax/LearningResourcesSection.css';
import IndabaxAboutSection from '../components/indabax/IndabaxAboutSection';
import '../components/indabax/IndabaxHero.css';
import '../components/indabax/LeadersSection.css';

const IndabaxHome = () => (
	<div>
		<IndabaxNavbar />
		<HeroSection />
		<LeadersSection />
		<IndabaxGallerySection />
		<LearningResourcesSection />
		<IndabaxAboutSection />
	</div>
);

export default IndabaxHome;
