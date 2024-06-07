// StartScreen.js
import React, { useState } from 'react';
import './StartScreen.css';  // Add a new CSS file for StartScreen-specific styles

const StartScreen = ({ onStart }) => {
  const [genre, setGenre] = useState('sayings');

  const handleChange = (event) => {
    setGenre(event.target.value);
  };

  const handleStart = () => {
    onStart(genre);
  };

  return (
    <div className="screen">
      <div className="info">
        <h1>Typing Speed Game</h1>
      </div>
      <div className="main">
        <p>Welcome to the Typing Speed Game. Test your typing skills and improve your speed. Select a genre and press play to start the game.</p>
        <div className="dropdown-container">
          <select className="genre-dropdown" value={genre} onChange={handleChange}>
            <option value="sayings">Sayings</option>
            <option value="news">News</option>
            <option value="programming">Programming</option>
            <option value="jokes">Jokes</option>
            <option value="advice">Advice</option>
          </select>
        </div>
      </div>
      <div className="buttons">
        <button onClick={handleStart}>Play</button>
      </div>
    </div>
  );
};

export default StartScreen;
