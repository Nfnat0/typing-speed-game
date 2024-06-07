// StartScreen.js
import React, { useState } from 'react';
import './StartScreen.css'; // Add a new CSS file for StartScreen-specific styles

const StartScreen = ({ onStart }) => {
  const [genre, setGenre] = useState('sayings');
  const [repetitions, setRepetitions] = useState(1);

  const handleChangeGenre = (event) => {
    setGenre(event.target.value);
  };

  const handleChangeRepetitions = (event) => {
    const value = Math.min(Math.max(Number(event.target.value), 1), 10);
    setRepetitions(value);
  };

  const handleStart = () => {
    onStart(genre, repetitions);
  };

  return (
    <div className="screen start-screen">
      <div className="info">
        <h1>Typing Speed Game</h1>
      </div>
      <div className="main">
        <p>Welcome to the Typing Speed Game. Test your typing skills and improve your speed. Select a genre and the number of repetitions, then press play to start the game.</p>
        <div className="dropdown-container">
          <label htmlFor="genre">Select Genre : </label>
          <select className="genre-dropdown" value={genre} onChange={handleChangeGenre}>
            <option value="sayings">Sayings</option>
            <option value="news">News</option>
            <option value="programming">Programming</option>
            <option value="jokes">Jokes</option>
            <option value="advice">Advice</option>
          </select>
        </div>
        <div className="input-container">
          <label htmlFor="repetitions">Repetitions (1-10):</label>
          <input
            type="number"
            id="repetitions"
            value={repetitions}
            onChange={handleChangeRepetitions}
            min="1"
            max="10"
          />
        </div>
      </div>
      <div className="buttons">
        <button onClick={handleStart}>Play</button>
      </div>
    </div>
  );
};

export default StartScreen;
