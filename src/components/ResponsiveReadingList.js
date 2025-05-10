import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResponsiveReadingList = ({ readings }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredReadings = readings.filter(reading =>
    (reading.title && reading.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (reading.scene && reading.scene.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (reading.page && reading.page.toString().includes(searchTerm))
  );

  const handleReadingClick = (readingId) => {
    navigate(`/reading/${readingId}`);
  };

  return (
    <div style={{ padding: '20px', marginTop: '60px' }}>
      <input
        type="text"
        placeholder="Search readings by title, scene, or page number..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '8px', border: '1px solid #ccc' }}
      />
      <h2>Responsive Readings</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filteredReadings.map(reading => (
          <li key={reading.id} style={{ padding: '10px', borderBottom: '1px solid #e5e7eb', cursor: 'pointer' }} onClick={() => handleReadingClick(reading.id)}>
            <span>{reading.page} - </span>
            <h3 style={{ display: 'inline' }}>{reading.title}</h3>
            <p>{reading.scene}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResponsiveReadingList; 