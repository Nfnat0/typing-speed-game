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
        <div className="containers">
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
          <div className="dropdown-container">
            <label htmlFor="repetitions">Select Repetitions : </label>
            <select className="repetitions-dropdown" value={repetitions} onChange={handleChangeRepetitions}>
              {Array.from({ length: 10 }, (_, i) => i + 1).map((value) => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="buttons">
        <button onClick={handleStart}>Play</button>
      </div>
    </div>
  );
};

export default StartScreen;
