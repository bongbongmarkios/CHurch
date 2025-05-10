import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ResponsiveReadingView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('Hiligaynon');

  const readings = JSON.parse(localStorage.getItem('readings')) || [];
  const reading = readings.find(r => r.id === parseInt(id));

  if (!reading) {
    return <div>Reading not found</div>;
  }

  const handleLanguageSelect = (language) => {
    setCurrentLanguage(language);
    setShowLanguageOptions(false);
  };

  const getScriptForLanguage = (language) => {
    switch (language) {
      case 'Hiligaynon':
        return reading.scriptHiligaynon || 'Script unavailable';
      case 'English':
        return reading.scriptEnglish || 'Script unavailable';
      case 'Tagalog':
        return reading.scriptTagalog || 'Script unavailable';
      default:
        return 'Script unavailable';
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={() => navigate(-1)} style={{ position: 'absolute', top: '60px', left: '20px', background: 'transparent', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#007aff' }}>←</button>
      <button onClick={() => setShowLanguageOptions(!showLanguageOptions)} style={{ position: 'absolute', top: '10px', right: '20px', background: 'transparent', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#007aff' }}>🌐</button>
      {showLanguageOptions && (
        <div style={{ position: 'absolute', top: '60px', right: '20px', backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '8px', padding: '10px' }}>
          <button onClick={() => handleLanguageSelect('Hiligaynon')} style={{ display: 'block', width: '100%', padding: '5px', margin: '5px 0', background: 'transparent', border: 'none', cursor: 'pointer', color: 'black' }}>Hiligaynon</button>
          <button onClick={() => handleLanguageSelect('English')} style={{ display: 'block', width: '100%', padding: '5px', margin: '5px 0', background: 'transparent', border: 'none', cursor: 'pointer', color: 'black' }}>English</button>
          <button onClick={() => handleLanguageSelect('Tagalog')} style={{ display: 'block', width: '100%', padding: '5px', margin: '5px 0', background: 'transparent', border: 'none', cursor: 'pointer', color: 'black' }}>Tagalog</button>
        </div>
      )}
      <h2 style={{ color: 'black' }}>{reading.title}</h2>
      <p style={{ color: 'black' }}>Verse: {reading.verse}</p>
      <div style={{ color: 'black' }}>
        {getScriptForLanguage(currentLanguage).split('\n').map((line, index) => (
          <p key={index} style={{ fontWeight: line.includes('People:') ? 'bold' : 'normal' }}>
            {line.replace('Leader:', '').replace('People:', '')}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ResponsiveReadingView;
