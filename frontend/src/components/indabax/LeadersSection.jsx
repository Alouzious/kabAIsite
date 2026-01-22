import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LeadersSection = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    axios.get('/api/indabax/leaders-api/')
      .then(res => {
        setLeaders(res.data);
        setLoading(false);
      })
      .catch(() => {
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

  if (loading) return <div>Loading leaders...</div>;
  if (error) return <div>{error}</div>;
  return (
    <section className="indabax-leaders">
      <h2>Current Leaders</h2>
      <div className="leaders-list">
        {currentLeaders.length === 0 ? <div>No current leaders found.</div> : currentLeaders.map(leader => (
          <div key={leader.id} className="leader-card">
            {leader.profile_image_url && <img src={leader.profile_image_url} alt={leader.name} className="leader-img" />}
            <h3>{leader.name}</h3>
            <p>{leader.role}</p>
            <p>{leader.course} ({leader.year})</p>
            <p>{leader.bio}</p>
            <div className="leader-socials">
              {leader.linkedin && <a href={leader.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
              {leader.twitter && <a href={leader.twitter} target="_blank" rel="noopener noreferrer">Twitter/X</a>}
              {leader.github && <a href={leader.github} target="_blank" rel="noopener noreferrer">GitHub</a>}
              {leader.email && <a href={`mailto:${leader.email}`}>Email</a>}
            </div>
          </div>
        ))}
      </div>
      <h2>Archived Leaders</h2>
      {Object.keys(archivedByYear).sort((a, b) => b - a).map(year => (
        <div key={year} className="archived-year">
          <h3>{year}</h3>
          <div className="leaders-list">
            {archivedByYear[year].map(leader => (
              <div key={leader.id} className="leader-card">
                {leader.profile_image_url && <img src={leader.profile_image_url} alt={leader.name} className="leader-img" />}
                <h3>{leader.name}</h3>
                <p>{leader.role}</p>
                <p>{leader.course} ({leader.year})</p>
                <p>{leader.bio}</p>
                <div className="leader-socials">
                  {leader.linkedin && <a href={leader.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
                  {leader.twitter && <a href={leader.twitter} target="_blank" rel="noopener noreferrer">Twitter/X</a>}
                  {leader.github && <a href={leader.github} target="_blank" rel="noopener noreferrer">GitHub</a>}
                  {leader.email && <a href={`mailto:${leader.email}`}>Email</a>}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default LeadersSection;
