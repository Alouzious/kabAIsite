import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import HeroSlider from '../components/home/HeroSlider';
import ProjectsSection from '../components/home/ProjectsSection';
import EventsSection from '../components/home/EventsSection';
import TeamSection from '../components/home/TeamSection';
import NewsSection from '../components/home/NewsSection';
import GallerySection from '../components/home/GallerySection';
import Footer from '../components/layout/Footer';
import PartnersSection from '../components/home/PartnersSection';
import { samplePartners } from '../data/sampleData';
import { 
  sampleSiteSettings, 
  sampleHeroSlides, 
  sampleProjects,
  sampleEvents,
  sampleLeaders,
  sampleLeaderCategories,
  sampleNews,
  sampleGallery,
  sampleContactInfo 
} from '../data/sampleData';
import './Home.css';

const Home = () => {
  // State for data that will come from Django API
  const [siteSettings, setSiteSettings] = useState({});
  const [heroSlides, setHeroSlides] = useState([]);
  const [aboutPages, setAboutPages] = useState([]);
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);
  const [leaders, setLeaders] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [partners, setPartners] = useState([]);
  const [research, setResearch] = useState([]);
  const [resources, setResources] = useState([]);
  const [community, setCommunity] = useState([]);
  const [projects, setProjects] = useState([]);
  const [contactInfo, setContactInfo] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch data from Django API when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // TODO:  Replace with actual API calls when Django backend is ready
        // Example: 
        // const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/site-settings/`);
        // const data = await response. json();
        // setSiteSettings(data);

        // For now, using sample data to see UI immediately
        setSiteSettings(sampleSiteSettings);
        setHeroSlides(sampleHeroSlides);
        setProjects(sampleProjects);
        setEvents(sampleEvents);
        setLeaders(sampleLeaders);
        setNews(sampleNews);
        setGallery(sampleGallery);
        setPartners(samplePartners);
        setContactInfo(sampleContactInfo);

        // Simulate loading delay
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="home-page">
      <Navbar 
        siteSettings={siteSettings}
        aboutPages={aboutPages}
        news={news}
        events={events}
        research={research}
        resources={resources}
        community={community}
        projects={projects}
      />
      
      <HeroSlider heroSlides={heroSlides} />
      
      <ProjectsSection initialProjects={projects} />
      
      <EventsSection 
        initialPastEvents={events. filter(e => e.type === 'past')}
        initialUpcomingEvents={events.filter(e => e.type === 'upcoming')}
        backgroundImage="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200"
      />
      
      <TeamSection 
        initialLeaders={leaders}
        categories={sampleLeaderCategories}
      />
      
      <NewsSection initialNews={news} />
      
      <GallerySection initialGallery={gallery} />
      
      {/* Add other sections here as you convert them */}
      {/* <PartnersSection partners={partners} /> */}
      {/* <ContactSection /> */}
      <PartnersSection initialPartners={partners} />
      
      <Footer 
        siteSettings={siteSettings} 
        contactInfo={contactInfo} 
      />
    </div>
  );
};

export default Home;