import React, { useEffect, useState } from 'react';
import axios from 'axios';

const typeLabels = {
  video: 'YouTube Video',
  doc: 'Google Doc',
  slide: 'Slides',
  link: 'Other Link',
  file: 'File Upload',
};

const LearningResourcesSection = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    axios.get('/api/indabax/resources/')
      .then(res => {
        setResources(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load resources.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading resources...</div>;
  if (error) return <div>{error}</div>;
  if (!resources.length) return <div>No learning resources found.</div>;

  return (
    <section className="indabax-resources">
      <h2>Learning Resources</h2>
      <div className="resources-list">
        {resources.map(res => (
          <div key={res.id} className="resource-card">
            <h4>{res.title}</h4>
            <span className="resource-type">{typeLabels[res.resource_type]}</span>
            <p>{res.description}</p>
            {res.url && <a href={res.url} target="_blank" rel="noopener noreferrer">View Resource</a>}
            {res.file_url && <a href={res.file_url} target="_blank" rel="noopener noreferrer">Download File</a>}
            {res.uploaded_by && <div className="resource-meta">Uploaded by: {res.uploaded_by}</div>}
            <div className="resource-meta">Added: {new Date(res.date_added).toLocaleDateString()}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LearningResourcesSection;
