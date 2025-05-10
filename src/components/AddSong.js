import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddSong = () => {
  const [title, setTitle] = useState('');
  const [key, setKey] = useState('');
  const [beat, setBeat] = useState('');
  const [hiligaynonLyrics, setHiligaynonLyrics] = useState('');
  const [tagalogLyrics, setTagalogLyrics] = useState('');
  const [englishLyrics, setEnglishLyrics] = useState('');
  const [page, setPage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^\d+$/.test(page)) {
      alert('Page number must contain numbers only');
      return;
    }
    const combinedLyrics = `Hiligaynon:\n${hiligaynonLyrics}\n\nTagalog:\n${tagalogLyrics}\n\nEnglish:\n${englishLyrics}`;
    const newSong = { id: Date.now(), title, key, beat, lyrics: combinedLyrics, hiligaynonLyrics, tagalogLyrics, englishLyrics, page };
    const songs = JSON.parse(localStorage.getItem('songs')) || [];
    songs.push(newSong);
    localStorage.setItem('songs', JSON.stringify(songs));

    // Create a blob and trigger download of the lyrics as a .txt file
    const blob = new Blob([combinedLyrics], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title.replace(/\s+/g, '_')}_lyrics.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    alert('Song was added and lyrics file downloaded');
    navigate('/songs');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Add a New Song</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required style={{ marginLeft: '10px' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Key:</label>
          <input type="text" value={key} onChange={(e) => setKey(e.target.value)} required style={{ marginLeft: '10px' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Beat:</label>
          <input type="text" value={beat} onChange={(e) => setBeat(e.target.value)} required style={{ marginLeft: '10px' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Page Number:</label>
          <input type="text" value={page} onChange={(e) => setPage(e.target.value)} required style={{ marginLeft: '10px' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Hiligaynon Lyrics:</label>
          <textarea value={hiligaynonLyrics} onChange={(e) => setHiligaynonLyrics(e.target.value)} required style={{ marginLeft: '10px', width: '100%', height: '80px' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Tagalog Lyrics:</label>
          <textarea value={tagalogLyrics} onChange={(e) => setTagalogLyrics(e.target.value)} required style={{ marginLeft: '10px', width: '100%', height: '80px' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>English Lyrics:</label>
          <textarea value={englishLyrics} onChange={(e) => setEnglishLyrics(e.target.value)} required style={{ marginLeft: '10px', width: '100%', height: '80px' }} />
        </div>
        <button type="submit" style={{ padding: '10px', backgroundColor: '#007aff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Add Song</button>
      </form>
    </div>
  );
};

export default AddSong;
