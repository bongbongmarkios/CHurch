import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const LyricsView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('hiligaynon'); // default to hiligaynon

  const songs = JSON.parse(localStorage.getItem('songs')) || [];
  const song = songs.find(s => s.id === parseInt(id));

  if (!song) {
    return <div>Song not found</div>;
  }

  const toggleLanguageMenu = () => {
    setShowLanguageMenu(!showLanguageMenu);
  };

  const selectLanguage = (language) => {
    setSelectedLanguage(language);
    setShowLanguageMenu(false);
  };

  const languageLabels = {
    hiligaynon: 'Hiligaynon',
    tagalog: 'Tagalog',
    english: 'English',
  };

  return (
    <div style={{ padding: '20px', position: 'relative' }}>
      <button onClick={() => navigate(-1)} style={{ position: 'absolute', top: '60px', left: '20px', background: 'transparent', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#007aff' }}>←</button>
      <h2 style={{ color: 'black', marginBottom: '10px' }}>{song.title}</h2>
      <p style={{ color: 'black' }}>Key: {song.key}</p>
      <p style={{ color: 'black' }}>Beat: {song.beat}</p>
      <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
        <button
          onClick={toggleLanguageMenu}
          title="Select language"
          style={{
            fontSize: '28px',
            cursor: 'pointer',
            backgroundColor: '#007aff',
            border: 'none',
            borderRadius: '50%',
            color: 'white',
            width: '40px',
            height: '40px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
          }}
          aria-label="Select language"
        >
          🌐
        </button>
        {showLanguageMenu && (
          <div style={{
            position: 'absolute',
            top: '50px',
            right: '0',
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: '5px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
            zIndex: 1000,
            width: '120px'
          }}>
            {Object.entries(languageLabels).map(([key, label]) => (
              <div
                key={key}
                onClick={() => selectLanguage(key)}
                style={{
                  padding: '10px',
                  cursor: 'pointer',
                  backgroundColor: selectedLanguage === key ? '#007aff' : 'white',
                  color: selectedLanguage === key ? 'white' : 'black',
                  borderBottom: '1px solid #eee',
                  userSelect: 'none'
                }}
              >
                {label}
              </div>
            ))}
          </div>
        )}
      </div>
      <div style={{ marginTop: '20px' }}>
        <h3>{languageLabels[selectedLanguage]} Lyrics</h3>
        <pre style={{ whiteSpace: 'pre-wrap', color: 'black' }}>{song[`${selectedLanguage}Lyrics`]}</pre>
      </div>
    </div>
  );
};

export default LyricsView;
