// StartScreen.js
import React, { useState } from 'react';

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
        <select value={genre} onChange={handleChange}>
          <option value="sayings">Sayings</option>
          <option value="news">News</option>
          {/* Add more genres here */}
        </select>
      </div>
      <div className="buttons">
        <button onClick={handleStart}>Play</button>
      </div>
    </div>
  );
};

export default StartScreen;
