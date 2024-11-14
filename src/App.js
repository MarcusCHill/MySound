import React from 'react';
import Spotify from './services/spotify';

const App = () => {
  return (
    <div className="App">
      <h1>Spotify OAuth Authentication</h1>
      <Spotify/>
    </div>
  );
};

export default App;
