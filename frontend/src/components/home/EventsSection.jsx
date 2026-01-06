import React, { useState, useEffect, useRef } from 'react';
import './EventsSection.css';

const EventsSection = ({ 
  initialPastEvents = [], 
  initialUpcomingEvents = [],
  backgroundImage = '' 
}) => {
  const [pastEvents, setPastEvents] = useState({
    events: initialPastEvents,
    page: 1,
    totalPages: 1,
    loading: false
  });

  const [upcomingEvents, setUpcomingEvents] = useState({
    events: initialUpcomingEvents,
    page: 1,
    totalPages: 1,
    loading:  false
  });

  const countdownInterval = useRef(null);

  // Update countdown timers
  const updateCountdowns = () => {
    const countdownElements = document.querySelectorAll('.events-countdown-timer[data-start]');
    countdownElements.forEach(element => {
      const startDate = new Date(element.getAttribute('data-start'));
      const now = new Date();
      const timeDiff = startDate - now;
      
      if (timeDiff > 0) {
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math. floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        
        const daysEl = element.querySelector('.events-timer-days');
        const hoursEl = element. querySelector('.events-timer-hours');
        const minutesEl = element.querySelector('.events-timer-minutes');
        
        if (daysEl) daysEl.textContent = days.toString().padStart(2, '0');
        if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
        if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
      } else {
        element.innerHTML = '<div class="events-live-badge">🔴 LIVE NOW</div>';
      }
    });
  };

  useEffect(() => {
    updateCountdowns();
    countdownInterval.current = setInterval(updateCountdowns, 60000);

    return () => {
      if (countdownInterval.current) {
        clearInterval(countdownInterval.current);
      }
    };
  }, [upcomingEvents.events]);

  // Fetch events from API
  const loadEvents = async (type, targetPage) => {
    const setState = type === 'past' ?  setPastEvents : setUpcomingEvents;
    const perPage = type === 'past' ? 1 : 2;

    setState(prev => ({ ...prev, loading: true }));

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/events/? type=${type}&page=${targetPage}&per_page=${perPage}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response. json();

      if (data.error) {
        throw new Error(data.error);
      }

      setState({
        events:  data.events || [],
        page: targetPage,
        totalPages: data.total_pages || 1,
        loading: false
      });

    } catch (error) {
      console.error(`Error loading ${type} events:`, error);
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  // Navigation handlers
  const handlePrevious = (type) => {
    const state = type === 'past' ? pastEvents :  upcomingEvents;
    if (state.page > 1 && !state.loading) {
      loadEvents(type, state. page - 1);
    }
  };

  const handleNext = (type) => {
    const state = type === 'past' ? pastEvents : upcomingEvents;
    if (state. page < state.totalPages && ! state.loading) {
      loadEvents(type, state.page + 1);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleString('default', { month: 'short' }).toUpperCase(),
      year: date.getFullYear()
    };
  };

  // Featured Event Card (for upcoming - first event gets hero treatment)
  const FeaturedEventCard = ({ event }) => {
    const dateInfo = event.event_start ? formatDate(event.event_start) : null;
    
    return (
      <div className="events-featured-card">
        <div className="events-featured-image">
          <img
            src={event.image || `${process.env.REACT_APP_MEDIA_URL}/default-event.jpg`}
            alt={event.title}
            loading="lazy"
          />
          <div className="events-featured-badge">Featured Event</div>
          {dateInfo && (
            <div className="events-date-badge">
              <span className="events-date-day">{dateInfo.day}</span>
              <span className="events-date-month">{dateInfo.month}</span>
            </div>
          )}
        </div>
        <div className="events-featured-content">
          <h3 className="events-featured-title">{event.title}</h3>
          <p className="events-featured-summary">{event.summary}</p>
          
          {event.organizer && (
            <div className="events-meta">
              <span className="events-meta-icon">👤</span>
              <span>{event.organizer}</span>
            </div>
          )}
          
          {event.event_start && (
            <div className="events-countdown-timer" data-start={event.event_start}>
              <div className="events-countdown-label">Event Starts In:</div>
              <div className="events-countdown-digits">
                <div className="events-time-unit">
                  <span className="events-timer-days">00</span>
                  <span className="events-timer-label">Days</span>
                </div>
                <div className="events-time-unit">
                  <span className="events-timer-hours">00</span>
                  <span className="events-timer-label">Hours</span>
                </div>
                <div className="events-time-unit">
                  <span className="events-timer-minutes">00</span>
                  <span className="events-timer-label">Minutes</span>
                </div>
              </div>
            </div>
          )}
          
          <a href={event. event_url} target="_blank" rel="noopener noreferrer" className="events-featured-cta">
            <span>View Event Details</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    );
  };

  // Regular Event Card
  const EventCard = ({ event, showDate = false }) => {
    const dateInfo = event.event_start ? formatDate(event.event_start) : null;
    
    return (
      <div className="events-modern-card">
        <div className="events-card-image-wrapper">
          <img
            src={event.image || `${process.env.REACT_APP_MEDIA_URL}/default-event.jpg`}
            alt={event.title}
            loading="lazy"
          />
          {showDate && dateInfo && (
            <div className="events-date-badge-small">
              <span className="events-date-day-small">{dateInfo.day}</span>
              <span className="events-date-month-small">{dateInfo.month}</span>
            </div>
          )}
        </div>
        <div className="events-card-content">
          <h4 className="events-card-title">{event.title}</h4>
          <p className="events-card-summary">{event. summary}</p>
          
          {event.organizer && (
            <div className="events-card-meta">
              <span className="events-meta-icon">👤</span>
              <span className="events-meta-text">{event.organizer}</span>
            </div>
          )}
          
          <a href={event.event_url} target="_blank" rel="noopener noreferrer" className="events-card-link">
            Learn More →
          </a>
        </div>
      </div>
    );
  };

  return (
    <section 
      id="events-section" 
      className="events-modern-section"
      style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none' }}
    >
      <div className="events-section-overlay"></div>
      
      <div className="events-wrapper">
        
        {/* Section Header */}
        <div className="events-section-header">
          <span className="events-section-subtitle">What's Happening</span>
          <h2 className="events-section-title">Events & Activities</h2>
          <p className="events-section-description">
            Stay updated with our latest events and past achievements
          </p>
        </div>

        {/* Upcoming Events */}
        <div className="events-block events-upcoming-block">
          <div className="events-block-header">
            <h3 className="events-block-title">
              <span className="events-title-icon">📅</span>
              Upcoming Events
            </h3>
          </div>

          {upcomingEvents.loading ? (
            <div className="events-loading-state">
              <div className="events-spinner"></div>
              <p>Loading events...</p>
            </div>
          ) : upcomingEvents.events.length > 0 ? (
            <>
              {/* First event gets featured treatment */}
              <FeaturedEventCard event={upcomingEvents.events[0]} />
              
              {/* Other events in grid */}
              {upcomingEvents.events.length > 1 && (
                <div className="events-grid">
                  {upcomingEvents.events.slice(1).map(event => (
                    <EventCard key={event.id} event={event} showDate={true} />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="events-empty-state">
              <div className="events-empty-icon">📭</div>
              <p>No upcoming events at the moment</p>
            </div>
          )}

          {upcomingEvents.totalPages > 1 && (
            <div className="events-pagination">
              <button
                className={`events-pagination-btn ${upcomingEvents.page <= 1 ? 'events-disabled' : ''}`}
                onClick={() => handlePrevious('upcoming')}
                disabled={upcomingEvents.page <= 1 || upcomingEvents. loading}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Previous
              </button>
              
              <span className="events-pagination-info">
                Page {upcomingEvents.page} of {upcomingEvents.totalPages}
              </span>
              
              <button
                className={`events-pagination-btn ${upcomingEvents.page >= upcomingEvents.totalPages ? 'events-disabled' : ''}`}
                onClick={() => handleNext('upcoming')}
                disabled={upcomingEvents.page >= upcomingEvents.totalPages || upcomingEvents.loading}
              >
                Next
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Past Events */}
        <div className="events-block events-past-block">
          <div className="events-block-header">
            <h3 className="events-block-title">
              <span className="events-title-icon">🏆</span>
              Past Events
            </h3>
          </div>

          {pastEvents. loading ? (
            <div className="events-loading-state">
              <div className="events-spinner"></div>
              <p>Loading events...</p>
            </div>
          ) : pastEvents.events.length > 0 ? (
            <div className="events-past-container">
              <EventCard event={pastEvents.events[0]} />
            </div>
          ) : (
            <div className="events-empty-state">
              <div className="events-empty-icon">📭</div>
              <p>No past events to display</p>
            </div>
          )}

          {pastEvents.totalPages > 1 && (
            <div className="events-pagination">
              <button
                className={`events-pagination-btn ${pastEvents.page <= 1 ? 'events-disabled' : ''}`}
                onClick={() => handlePrevious('past')}
                disabled={pastEvents.page <= 1 || pastEvents.loading}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Previous
              </button>
              
              <span className="events-pagination-info">
                Page {pastEvents.page} of {pastEvents.totalPages}
              </span>
              
              <button
                className={`events-pagination-btn ${pastEvents.page >= pastEvents.totalPages ? 'events-disabled' : ''}`}
                onClick={() => handleNext('past')}
                disabled={pastEvents.page >= pastEvents.totalPages || pastEvents.loading}
              >
                Next
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default EventsSection;