import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BottomNavBar from './components/BottomNavBar';
import SongList from './components/SongList';
import ResponsiveReadingList from './components/ResponsiveReadingList';
import ResponsiveReadingView from './components/ResponsiveReadingView';
import LyricsView from './components/LyricsView';
import Sidebar from './components/Sidebar';
import AddSong from './components/AddSong';
import DeleteSongList from './components/DeleteSongList';
import DataView from './components/DataView';
import hymns from './data/hymns.json';
import readings from './data/readings.json';
import './App.css';

function App() {
  const [songs, setSongs] = useState([]);
  const [responsiveReadings, setResponsiveReadings] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen]);

  useEffect(() => {
    // Load data from localStorage or fallback to bundled JSON
    const storedSongs = localStorage.getItem('hymns');
    const storedReadings = localStorage.getItem('readings');

    if (storedSongs) {
      setSongs(JSON.parse(storedSongs));
    } else {
      setSongs(hymns);
      localStorage.setItem('hymns', JSON.stringify(hymns));
    }

    if (storedReadings) {
      setResponsiveReadings(JSON.parse(storedReadings));
    } else {
      setResponsiveReadings(readings);
      localStorage.setItem('readings', JSON.stringify(readings));
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <button
          onClick={() => setIsSidebarOpen((open) => !open)}
          style={{ position: 'fixed', top: '10px', left: '10px', zIndex: 1000, background: 'transparent', border: 'none', fontSize: '32px', cursor: 'pointer', color: '#007aff', padding: 0 }}
        >
          {isSidebarOpen ? '×' : '☰'}
        </button>
        <Sidebar ref={sidebarRef} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/songs" element={<SongList songs={songs} />} />
          <Route path="/readings" element={<ResponsiveReadingList readings={responsiveReadings} />} />
          <Route path="/reading/:id" element={<ResponsiveReadingView readings={responsiveReadings} />} />
          <Route path="/lyrics/:id" element={<LyricsView songs={songs} />} />
          <Route path="/add-song" element={<AddSong />} />
          <Route path="/delete-song" element={<DeleteSongList />} />
          <Route path="/data" element={<DataView />} />
        </Routes>
        <BottomNavBar />
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f0f0f5',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '20px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center'
      }}>
        <h1 style={{ fontWeight: '600', fontSize: '2rem', marginBottom: '20px', color: '#333' }}>Welcome to the Hymnal App</h1>
        <p style={{ fontSize: '1rem', color: '#666' }}>Select an option from the bottom navigation bar.</p>
      </div>
    </div>
  );
}

export default App;
