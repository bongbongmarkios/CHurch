import React, { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = forwardRef(({ isOpen, onClose }, ref) => {
  const navigate = useNavigate();

  const handleHomepage = () => {
    navigate('/');
    onClose();
  };

  // Removed handleFavorite and favorite button

  const handleAddSong = () => {
    navigate('/add-song');
    onClose();
  };

  const handleDeleteSong = () => {
    navigate('/delete-song');
    onClose();
  };

  const handleData = () => {
    navigate('/data');
    onClose();
  };

  const handleAbout = () => {
    navigate('/about');
    onClose();
  };

  const handleProfile = () => {
    navigate('/profile');
    onClose();
  };

  const handleSettings = () => {
    navigate('/settings');
    onClose();
  };

  return (
    <div ref={ref} className="sidebar" style={{ position: 'fixed', top: 0, left: isOpen ? 0 : '-250px', width: '250px', height: '100%', backgroundColor: 'white', boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)', transition: 'left 0.3s ease', overflowY: 'auto' }}>
      <button onClick={onClose} style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'transparent', border: 'none', fontSize: '24px', color: '#007aff', padding: 0 }}>×</button>
      <h2 style={{ padding: '20px', color: '#007aff', borderBottom: '1px solid #e5e7eb' }}>Hymnal App</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li style={{ padding: '10px 20px' }}><button onClick={handleHomepage} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'black' }}>Homepage</button></li>
        {/* Removed Favorite button */}
        <li style={{ padding: '10px 20px' }}><button onClick={handleAddSong} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'black' }}>Add Song</button></li>
        <li style={{ padding: '10px 20px' }}><button onClick={handleDeleteSong} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'black' }}>Delete Song</button></li>
        <li style={{ padding: '10px 20px' }}><button onClick={handleData} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'black' }}>Data</button></li>
        <li style={{ padding: '10px 20px' }}><button onClick={handleAbout} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'black' }}>About</button></li>
        <li style={{ padding: '10px 20px' }}><button onClick={handleProfile} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'black' }}>Profile</button></li>
        <li style={{ padding: '10px 20px' }}><button onClick={handleSettings} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'black' }}>Settings</button></li>
      </ul>
    </div>
  );
});

export default Sidebar;
