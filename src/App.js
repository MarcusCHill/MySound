import './App.css'
import React from 'react';
import Spotify from './services/spotify';
//mount Spotify component within App, Spotify contains all other pages

const App = () => {
  return (
    <div className="App">
      <Spotify/>
    </div>
  );
};

export default App;
