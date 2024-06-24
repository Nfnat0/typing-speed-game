// StartScreen.js
import React, { useState, useEffect } from "react";
import "./StartScreen.css";

const StartScreen = ({
  onStart,
  onViewStatistics,
  selectedGenre,
  repetitions,
  selectedMode,
}) => {
  const [genre, setGenre] = useState(selectedGenre);
  const [repetitionsCount, setRepetitionsCount] = useState(repetitions);
  const [mode, setMode] = useState(selectedMode);

  useEffect(() => {
    setGenre(selectedGenre);
    setRepetitionsCount(repetitions);
  }, [selectedGenre, repetitions]);

  const handleChangeGenre = (event) => {
    setGenre(event.target.value);
  };

  const handleChangeRepetitions = (event) => {
    const value = Math.min(Math.max(Number(event.target.value), 1), 20);
    setRepetitionsCount(value);
  };

  const handleStart = () => {
    onStart(genre, repetitionsCount, mode);
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
            <label htmlFor="genre">Genre : </label>
            <select
              className="genre-dropdown"
              value={genre}
              onChange={handleChangeGenre}
            >
              <option value="file">File</option>
              <option value="file2">File2</option>
              <option value="sayings">Sayings</option>
              <option value="news">News</option>
              <option value="programming">Programming</option>
              <option value="jokes">Jokes</option>
              <option value="advice">Advice</option>
              <option value="test">Test</option>
            </select>
          </div>
          <div className="dropdown-container">
            <label htmlFor="repetitions">Repetitions : </label>
            <select
              className="repetitions-dropdown"
              value={repetitionsCount}
              onChange={handleChangeRepetitions}
            >
              {Array.from({ length: 20 }, (_, i) => i + 1).map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <div className="dropdown-container">
            <label htmlFor="mode">Mode : </label>
            <select
              className="mode-dropdown"
              value={mode}
              onChange={(e) => setMode(e.target.value)}
            >
              <option value="normal">Normal</option>
              <option value="phantom">Phantom</option>
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
