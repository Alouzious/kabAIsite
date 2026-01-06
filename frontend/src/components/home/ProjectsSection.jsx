import React, { useState, useEffect, useRef } from 'react';
import './ProjectsSection.css';

const ProjectsSection = ({ initialProjects = [] }) => {
  const [projects, setProjects] = useState(initialProjects);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loadedProjectIds, setLoadedProjectIds] = useState(new Set());
  
  const sliderWrapperRef = useRef(null);
  const sliderRef = useRef(null);
  const scrollTimeoutRef = useRef(null);

  const CONFIG = {
    cardWidth: 350,
    gap: 30,
    scrollAmount: 380,
    maxDepth: 5,
    scrollDebounce: 100,
    animationDelay: 200,
    fetchTimeout: 8000
  };

  // Initialize loaded project IDs
  useEffect(() => {
    const ids = new Set(initialProjects.map(p => p.id.toString()));
    setLoadedProjectIds(ids);
  }, [initialProjects]);

  // Update mid-card highlight
  const updateMidCardHighlight = () => {
    if (!sliderRef.current || !sliderWrapperRef.current) return;

    const cards = sliderRef.current.querySelectorAll('.project-card:not(.loading-card)');
    cards.forEach(card => card.classList.remove('mid-card'));

    const wrapperRect = sliderWrapperRef.current.getBoundingClientRect();
    const visibleCards = [];

    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      if (rect.left >= wrapperRect.left && rect.right <= wrapperRect.right) {
        visibleCards.push(card);
      }
    });

    if (visibleCards.length >= 3) {
      visibleCards[1].classList.add('mid-card');
    }
  };

  // Update button states
  const updateButtonStates = () => {
    if (!sliderWrapperRef.current) return;

    const scrollLeft = sliderWrapperRef.current.scrollLeft;
    const maxScroll = sliderWrapperRef.current.scrollWidth - sliderWrapperRef.current.clientWidth;

    return {
      leftDisabled: scrollLeft <= 0,
      rightDisabled: loading || (!hasNextPage && scrollLeft >= maxScroll - 10)
    };
  };

  // Handle scroll events
  const handleScroll = () => {
    if (scrollTimeoutRef.current) return;
    
    scrollTimeoutRef.current = requestAnimationFrame(() => {
      updateMidCardHighlight();
      scrollTimeoutRef.current = null;
    });
  };

  useEffect(() => {
    const wrapper = sliderWrapperRef.current;
    if (!wrapper) return;

    let lastScrollTime = 0;
    const throttledScroll = () => {
      const now = Date.now();
      if (now - lastScrollTime > CONFIG.scrollDebounce) {
        lastScrollTime = now;
        handleScroll();
      }
    };

    wrapper.addEventListener('scroll', throttledScroll, { passive: true });
    
    // Initial highlight
    requestAnimationFrame(() => {
      updateMidCardHighlight();
    });

    return () => {
      wrapper.removeEventListener('scroll', throttledScroll);
      if (scrollTimeoutRef.current) {
        cancelAnimationFrame(scrollTimeoutRef.current);
      }
    };
  }, [projects]);

  // Fetch more projects
  const fetchProjects = async (page) => {
    if (loading || !hasNextPage || page > CONFIG.maxDepth) return false;

    setLoading(true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), CONFIG.fetchTimeout);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/projects/?page=${page}`, {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.projects && data.projects.length > 0) {
        const newProjects = data.projects.filter(
          proj => !loadedProjectIds.has(proj.id.toString())
        );

        if (newProjects.length > 0) {
          setProjects(prev => [...prev, ...newProjects]);
          setLoadedProjectIds(prev => {
            const newSet = new Set(prev);
            newProjects.forEach(p => newSet.add(p.id.toString()));
            return newSet;
          });
        }

        setHasNextPage(data.has_next);

        requestAnimationFrame(() => {
          updateMidCardHighlight();
        });

        return newProjects.length > 0;
      } else {
        setHasNextPage(false);
        return false;
      }
    } catch (error) {
      clearTimeout(timeoutId);
      console.error('Error fetching projects:', error);
      setHasNextPage(false);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Slide left
  const slideLeft = () => {
    if (loading || !sliderWrapperRef.current) return;

    const currentScroll = sliderWrapperRef.current.scrollLeft;
    const newScroll = Math.max(0, currentScroll - CONFIG.scrollAmount);

    sliderWrapperRef.current.scrollTo({ left: newScroll, behavior: 'smooth' });

    setTimeout(() => {
      requestAnimationFrame(() => {
        updateMidCardHighlight();
      });
    }, CONFIG.animationDelay);
  };

  // Slide right
  const slideRight = async () => {
    if (loading || !sliderWrapperRef.current) return;

    const currentScroll = sliderWrapperRef.current.scrollLeft;
    const maxScroll = sliderWrapperRef.current.scrollWidth - sliderWrapperRef.current.clientWidth;

    if (currentScroll >= maxScroll - CONFIG.scrollAmount && hasNextPage && !loading) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      const loaded = await fetchProjects(nextPage);

      if (loaded) {
        setTimeout(() => {
          const newMaxScroll = sliderWrapperRef.current.scrollWidth - sliderWrapperRef.current.clientWidth;
          const newScroll = Math.min(newMaxScroll, currentScroll + CONFIG.scrollAmount);
          sliderWrapperRef.current.scrollTo({ left: newScroll, behavior: 'smooth' });

          setTimeout(() => {
            requestAnimationFrame(() => {
              updateMidCardHighlight();
            });
          }, CONFIG.animationDelay);
        }, 100);
      }
    } else {
      const newScroll = Math.min(maxScroll, currentScroll + CONFIG.scrollAmount);
      sliderWrapperRef.current.scrollTo({ left: newScroll, behavior: 'smooth' });

      setTimeout(() => {
        requestAnimationFrame(() => {
          updateMidCardHighlight();
        });
      }, CONFIG.animationDelay);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Truncate text
  const truncateText = (text, maxLength = 100) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const buttonStates = updateButtonStates();

  return (
    <section className="projects-slider-section" id="projects-section">
      <div className="container">
        <h2 className="section-title">Our Latest Projects</h2>
        <div className="projects-slider-wrapper" id="projectsSliderWrapper" ref={sliderWrapperRef}>
          <div className="projects-slider" id="projectsSlider" ref={sliderRef}>
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`project-card ${index === 1 ? 'mid-card' : ''}`}
                data-project-id={project.id}
              >
                <img
                  src={project.image || `${process.env.REACT_APP_MEDIA_URL}/default-project.jpg`}
                  alt={project.title}
                  className="project-image"
                  loading="lazy"
                />
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-summary">{truncateText(project.summary, 100)}</p>
                  <div className="project-meta">
                    <span className="project-date">{formatDate(project.publish_date)}</span>
                    {project.url && (
                      <a
                        href={project.url}
                        className="project-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Learn More
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="project-card loading-card">
                <div className="loading-spinner">Loading...</div>
              </div>
            )}
          </div>
        </div>
        
        {/* Slider navigation buttons */}
        <div className="slider-nav-container">
          <button
            className="slider-btn"
            id="slideLeft"
            type="button"
            onClick={slideLeft}
            disabled={buttonStates?.leftDisabled}
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button
            className="slider-btn"
            id="slideRight"
            type="button"
            onClick={slideRight}
            disabled={buttonStates?.rightDisabled}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;