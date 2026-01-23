import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Linkedin, Twitter, Github, Mail } from 'lucide-react';

const LeadersSection = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    axios.get('/api/indabax/leaders-api/')
      .then(res => {
        // Handle both paginated and non-paginated responses
        const data = res.data.results || res.data || [];
        setLeaders(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading leaders:', err);
        setError('Failed to load leaders.');
        setLoading(false);
      });
  }, []);

  const currentLeaders = leaders.filter(l => l.is_current);
  const archived = leaders.filter(l => !l.is_current);
  const archivedByYear = {};
  archived.forEach(l => {
    if (!archivedByYear[l.year]) archivedByYear[l.year] = [];
    archivedByYear[l.year].push(l);
  });

  if (loading) return <div className="text-center p-4">Loading leaders...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  
  return (
    <section className="indabax-leaders py-5">
      <div className="container">
        <h2 className="mb-4">Current Leaders</h2>
        <div className="row leaders-list">
          {currentLeaders.length === 0 ? (
            <div className="col-12"><p>No current leaders found.</p></div>
          ) : (
            currentLeaders.map(leader => (
              <div key={leader.id} className="col-md-6 col-lg-4 mb-4">
                <div className="leader-card card h-100">
                  {leader.profile_image_url && (
                    <img 
                      src={leader.profile_image_url} 
                      alt={leader.name} 
                      className="leader-img card-img-top"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  )}
                  <div className="card-body">
                    <h3 className="card-title">{leader.name}</h3>
                    <p className="card-subtitle mb-2 text-muted">{leader.role}</p>
                    <p className="text-muted">{leader.course} ({leader.year})</p>
                    <p className="card-text">{leader.bio}</p>
                    <div className="leader-socials d-flex gap-2 flex-wrap">
                      {leader.linkedin && (
                        <a href={leader.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary" title="LinkedIn">
                          <Linkedin size={18} />
                        </a>
                      )}
                      {leader.twitter && (
                        <a href={leader.twitter} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-info" title="Twitter/X">
                          <Twitter size={18} />
                        </a>
                      )}
                      {leader.github && (
                        <a href={leader.github} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-dark" title="GitHub">
                          <Github size={18} />
                        </a>
                      )}
                      {leader.email && (
                        <a href={`mailto:${leader.email}`} className="btn btn-sm btn-outline-secondary" title="Email">
                          <Mail size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {Object.keys(archivedByYear).length > 0 && (
          <>
            <h2 className="mt-5 mb-4">Archived Leaders</h2>
            {Object.keys(archivedByYear).sort((a, b) => b - a).map(year => (
              <div key={year} className="archived-year mb-4">
                <h3 className="mb-3">{year}</h3>
                <div className="row leaders-list">
                  {archivedByYear[year].map(leader => (
                    <div key={leader.id} className="col-md-6 col-lg-4 mb-4">
                      <div className="leader-card card h-100">
                        {leader.profile_image_url && (
                          <img 
                            src={leader.profile_image_url} 
                            alt={leader.name} 
                            className="leader-img card-img-top"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        )}
                        <div className="card-body">
                          <h3 className="card-title">{leader.name}</h3>
                          <p className="card-subtitle mb-2 text-muted">{leader.role}</p>
                          <p className="text-muted">{leader.course} ({leader.year})</p>
                          <p className="card-text">{leader.bio}</p>
                          <div className="leader-socials d-flex gap-2 flex-wrap">
                            {leader.linkedin && (
                              <a href={leader.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary" title="LinkedIn">
                                <Linkedin size={18} />
                              </a>
                            )}
                            {leader.twitter && (
                              <a href={leader.twitter} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-info" title="Twitter/X">
                                <Twitter size={18} />
                              </a>
                            )}
                            {leader.github && (
                              <a href={leader.github} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-dark" title="GitHub">
                                <Github size={18} />
                              </a>
                            )}
                            {leader.email && (
                              <a href={`mailto:${leader.email}`} className="btn btn-sm btn-outline-secondary" title="Email">
                                <Mail size={18} />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default LeadersSection;