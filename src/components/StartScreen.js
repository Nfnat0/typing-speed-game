// StartScreen.js
import React, { useState } from "react";
import "./StartScreen.css"; // Add a new CSS file for StartScreen-specific styles

const StartScreen = ({ onStart, onViewStatistics }) => {
  const [genre, setGenre] = useState("file");
  const [repetitions, setRepetitions] = useState(10);

  const handleChangeGenre = (event) => {
    setGenre(event.target.value);
  };

  const handleChangeRepetitions = (event) => {
    const value = Math.min(Math.max(Number(event.target.value), 1), 20);
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
        <h3>Test your typing skills and improve your speed.</h3>
        <div className="containers">
          <div className="dropdown-container">
            <label htmlFor="genre">Select Genre : </label>
            <select
              className="genre-dropdown"
              value={genre}
              onChange={handleChangeGenre}
            >
              <option value="file">File</option>
              <option value="sayings">Sayings</option>
              <option value="news">News</option>
              <option value="programming">Programming</option>
              <option value="jokes">Jokes</option>
              <option value="advice">Advice</option>
              <option value="test">Test</option>
            </select>
          </div>
          <div className="dropdown-container">
            <label htmlFor="repetitions">Select Repetitions : </label>
            <select
              className="repetitions-dropdown"
              value={repetitions}
              onChange={handleChangeRepetitions}
            >
              {Array.from({ length: 20 }, (_, i) => i + 1).map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="buttons">
        <button className="play-button" onClick={handleStart}>
          Play
        </button>
        <button className="statistics-button" onClick={onViewStatistics}>
          Statistics
        </button>{" "}
      </div>
    </div>
  );
};

export default StartScreen;
