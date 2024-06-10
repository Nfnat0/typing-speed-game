// App.js
import React, { useState, useRef } from "react";
import "./App.css";
import StartScreen from "./components/StartScreen";
import GameScreen from "./components/GameScreen";
import ResultScreen from "./components/ResultScreen";
import StatisticsScreen from "./components/StatisticsScreen";

const App = () => {
  const [gameState, setGameState] = useState("start"); // 'start', 'playing', 'result', 'statistics'
  const [genre, setGenre] = useState("sayings");
  const [repetitions, setRepetitions] = useState(1);
  const [history, setHistory] = useState([]); // Store game history
  const inputRef = useRef(null);

  const handleStart = (selectedGenre, selectedReptitions) => {
    setGenre(selectedGenre);
    setRepetitions(selectedReptitions);
    setGameState("playing");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleGameOver = (
    score,
    correctLetters,
    totalLetters,
    mistakes,
    elapsedTime,
    gameCleared
  ) => {
    const newEntry = {
      date: new Date(),
      score: score || 0,
      accuracy: ((correctLetters / totalLetters) * 100 || 0).toFixed(2),
      totalLetters: totalLetters || 0,
      mistakes: mistakes || 0,
      elapsedTime: elapsedTime || 0,
      gameCleared: gameCleared || false,
    };
    setHistory([...history, newEntry]);
    setGameState("result");
  };

  const handleRestart = () => {
    setGameState("start");
  };

  const handleViewStatistics = () => {
    setGameState("statistics");
  };

  const handleBackToStart = () => {
    setGameState("start");
  };

  return (
    <div className="app">
      {gameState === "start" && (
        <StartScreen
          onStart={handleStart}
          onViewStatistics={handleViewStatistics}
        />
      )}
      {gameState === "playing" && (
        <GameScreen
          genre={genre}
          repetitions={repetitions}
          onGameOver={handleGameOver}
          inputRef={inputRef}
          onRestart={handleRestart}
        />
      )}
      {gameState === "result" && (
        <ResultScreen
          history={history}
          onRestart={handleRestart}
          onViewStatistics={handleViewStatistics}
        />
      )}
      {gameState === "statistics" && (
        <StatisticsScreen history={history} onBackToStart={handleBackToStart} />
      )}
    </div>
  );
};

export default App;
