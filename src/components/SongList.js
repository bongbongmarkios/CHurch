import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SongList = () => {
  const [songs, setSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch songs from localStorage
    const storedSongs = JSON.parse(localStorage.getItem('songs')) || [];
    setSongs(storedSongs);

    // Fetch favorites from localStorage
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const handleSongClick = (song) => {
    navigate(`/lyrics/${song.id}`);
  };

  const toggleFavorite = (songId) => {
    const newFavorites = favorites.includes(songId)
      ? favorites.filter(id => id !== songId)
      : [...favorites, songId];
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const getRandomColor = () => {
    const colors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const filteredSongs = songs.filter(song => {
    const matchesSearch = song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (song.page !== undefined && song.page !== null && song.page.toString().includes(searchTerm));
    const isFavorite = favorites.includes(song.id);
    return matchesSearch && (!showFavoritesOnly || isFavorite);
  });

  return (
    <div style={{ padding: '20px', marginTop: '60px' }}>
      <input
        type="text"
        placeholder="Search hymns by title or page number..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
      />
      <button
        onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
        style={{
          marginBottom: '20px',
          padding: '8px 16px',
          borderRadius: '8px',
          border: '1px solid #007aff',
          backgroundColor: showFavoritesOnly ? '#007aff' : 'white',
          color: showFavoritesOnly ? 'white' : '#007aff',
          cursor: 'pointer',
          fontWeight: '600'
        }}
      >
        {showFavoritesOnly ? 'Show All Songs' : 'Show Favorites'}
      </button>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filteredSongs.map(song => (
          <li key={song.id} style={{ padding: '10px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span onClick={() => handleSongClick(song)} style={{ cursor: 'pointer' }}>
              {song.page !== undefined && song.page !== null ? <span style={{ color: '#007aff', marginRight: '6px' }}>{song.page}</span> : null}{song.title}
            </span>
            <button
              onClick={() => toggleFavorite(song.id)}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: '20px',
                color: favorites.includes(song.id) ? getRandomColor() : '#ccc',
                transition: 'color 0.3s ease'
              }}
              title={favorites.includes(song.id) ? 'Remove from favorites' : 'Add to favorites'}
            >
              {favorites.includes(song.id) ? '❤️' : '♡'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SongList;
