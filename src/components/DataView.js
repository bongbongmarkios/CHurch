import React, { useState, useEffect } from 'react';

const DataView = () => {
  const [songs, setSongs] = useState([]);
  const [editing, setEditing] = useState({}); // { songId_language: true/false }
  const [editedLyrics, setEditedLyrics] = useState({}); // { songId_language: text }

  useEffect(() => {
    const storedSongs = JSON.parse(localStorage.getItem('songs')) || [];
    setSongs(storedSongs);
  }, []);

  const handleEditClick = (songId, language, currentLyrics) => {
    const key = `${songId}_${language}`;
    setEditing(prev => ({ ...prev, [key]: true }));
    setEditedLyrics(prev => ({ ...prev, [key]: currentLyrics }));
  };

  const handleLyricsChange = (songId, language, value) => {
    const key = `${songId}_${language}`;
    setEditedLyrics(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = (songId, language) => {
    const key = `${songId}_${language}`;
    const newLyrics = editedLyrics[key];
    setSongs(prevSongs => {
      const updatedSongs = prevSongs.map(song => {
        if (song.id === songId) {
          const updatedSong = { ...song };
          if (language === 'hiligaynon') updatedSong.hiligaynonLyrics = newLyrics;
          else if (language === 'tagalog') updatedSong.tagalogLyrics = newLyrics;
          else if (language === 'english') updatedSong.englishLyrics = newLyrics;
          // Update combined lyrics as well
          updatedSong.lyrics = `Hiligaynon:\n${updatedSong.hiligaynonLyrics}\n\nTagalog:\n${updatedSong.tagalogLyrics}\n\nEnglish:\n${updatedSong.englishLyrics}`;
          return updatedSong;
        }
        return song;
      });
      localStorage.setItem('songs', JSON.stringify(updatedSongs));
      return updatedSongs;
    });
    setEditing(prev => ({ ...prev, [key]: false }));
  };

  return (
    <div style={{ padding: '20px', marginTop: '60px' }}>
      <h2>Stored Songs Lyrics Files</h2>
      {songs.length === 0 ? (
        <p>No songs found in data storage.</p>
      ) : (
        songs.map(song => (
          <div key={song.id} style={{ marginBottom: '30px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
            <h3>{song.title}</h3>
            <div style={{ marginLeft: '20px' }}>
              {['hiligaynon', 'tagalog', 'english'].map(language => {
                const key = `${song.id}_${language}`;
                const fileName = `${song.title.replace(/\s+/g, '_')}_${language}.txt`;
                return (
                  <div key={key} style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
                    <button
                      onClick={() => handleEditClick(song.id, language, song[`${language}Lyrics`])}
                      style={{ marginRight: '10px', flexShrink: 0 }}
                    >
                      Edit
                    </button>
                    <strong>{fileName}</strong>
                    {!editing[key] ? null : (
                      <div style={{ width: '100%', marginTop: '5px' }}>
                        <textarea
                          value={editedLyrics[key]}
                          onChange={(e) => handleLyricsChange(song.id, language, e.target.value)}
                          style={{ width: '100%', height: '100px', marginTop: '5px' }}
                        />
                        <button onClick={() => handleSave(song.id, language)} style={{ marginTop: '5px' }}>
                          Save
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default DataView;
