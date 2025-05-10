import React, { useState, useEffect } from 'react';

const DeleteSongList = () => {
  const [songs, setSongs] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);

  useEffect(() => {
    const storedSongs = JSON.parse(localStorage.getItem('songs')) || [];
    setSongs(storedSongs);
  }, []);

  const handleCheckboxChange = (id) => {
    if (selectedSongs.includes(id)) {
      setSelectedSongs(selectedSongs.filter(songId => songId !== id));
    } else {
      setSelectedSongs([...selectedSongs, id]);
    }
  };

  const handleDelete = () => {
    if (selectedSongs.length === 0) return;
    if (!window.confirm('Are you sure you want to delete the selected song(s)? This action cannot be undone.')) return;

    const updatedSongs = songs.filter(song => !selectedSongs.includes(song.id));
    setSongs(updatedSongs);
    localStorage.setItem('songs', JSON.stringify(updatedSongs));
    setSelectedSongs([]);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Delete Songs</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {songs.map(song => (
          <li key={song.id} style={{ padding: '10px', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              checked={selectedSongs.includes(song.id)}
              onChange={() => handleCheckboxChange(song.id)}
              style={{ marginRight: '10px' }}
            />
            <span>{song.page !== undefined && song.page !== null ? `(Page: ${song.page}) ` : ''}{song.title}</span>
          </li>
        ))}
      </ul>
      {selectedSongs.length > 0 && (
        <button
          onClick={handleDelete}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#ff3b30',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          Delete Selected Song(s)
        </button>
      )}
    </div>
  );
};

export default DeleteSongList;
