import React from 'react';
import { Link } from 'react-router-dom';

function BottomNavBar() {
  return (
    <div style={{ position: 'fixed', bottom: 0, width: '100%', display: 'flex', justifyContent: 'space-around', padding: '10px', backgroundColor: '#f0f0f0', borderTop: '1px solid #ccc' }}>
      <Link to="/songs" style={{ textDecoration: 'none', color: 'black' }}>Hymnal</Link>
      <Link to="/readings" style={{ textDecoration: 'none', color: 'black' }}>Responsive Readings</Link>
    </div>
  );
}

export default BottomNavBar; 