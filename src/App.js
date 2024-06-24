import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import StartScreen from "./components/StartScreen";
import GameScreen from "./components/GameScreen";
import ResultScreen from "./components/ResultScreen";
import StatisticsScreen from "./components/StatisticsScreen";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

const Header = ({ user, signOut }) => {
  return (
    <div className="header">
      <span>{user ? user.username : "Guest user"}</span>
      {user && <button onClick={signOut}>Sign out</button>}
    </div>
  );
};

const App = () => {
  const [gameState, setGameState] = useState("start"); // 'start', 'playing', 'result', 'statistics'
  const [genre, setGenre] = useState("file1");
  const [repetitions, setRepetitions] = useState(15);
  const [selectedMode, setSelectedMode] = useState("normal");
  const [history, setHistory] = useState([]); // Store game history
  const inputRef = useRef(null);

  // Load history from localStorage when the app starts
  useEffect(() => {
    const savedHistory = localStorage.getItem("gameHistory");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save history to localStorage whenever it is updated
  useEffect(() => {
    localStorage.setItem("gameHistory", JSON.stringify(history));
  }, [history]);

  const handleStart = (selectedGenre, selectedReptitions, mode) => {
    setGenre(selectedGenre);
    setRepetitions(selectedReptitions);
    setSelectedMode(mode);
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
      date: new Date().toLocaleString("ja-JP"),
      score: score || 0,
      accuracy: ((correctLetters / totalLetters) * 100 || 0).toFixed(2),
      correctLetters: correctLetters || 0,
      mistakes: mistakes || 0,
      elapsedTime: elapsedTime || 0,
      gameCleared: gameCleared || false,
      mode: selectedMode,
    };
    setHistory([newEntry, ...history]); // Add new data to the top
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

  const handleClearHistory = () => {
    localStorage.removeItem("gameHistory");
    setHistory([]);
  };

  return (
    <Authenticator signUpAttributes={["email"]}>
      {({ signOut, user }) => (
        <div className="app">
          <Header user={user} signOut={signOut} />
          {gameState === "start" && (
            <StartScreen
              onStart={handleStart}
              onViewStatistics={handleViewStatistics}
              selectedGenre={genre}
              repetitions={repetitions}
              selectedMode={selectedMode}
            />
          )}
          {gameState === "playing" && (
            <GameScreen
              genre={genre}
              repetitions={repetitions}
              mode={selectedMode}
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
            <StatisticsScreen
              history={history}
              onBackToStart={handleBackToStart}
              onClearHistory={handleClearHistory}
            />
          )}
        </div>
      )}
    </Authenticator>
  );
};

export default App;
