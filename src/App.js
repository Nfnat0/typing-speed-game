import React, { useState, useRef } from "react";
import "./App.css";
import StartScreen from "./components/StartScreen";
import GameScreen from "./components/GameScreen";
import ResultScreen from "./components/ResultScreen";

const App = () => {
  const [gameState, setGameState] = useState("start"); // 'start', 'playing', 'result'
  const [genre, setGenre] = useState("sayings");
  const [repetitions, setRepetitions] = useState(1);
  const [score, setScore] = useState(0);
  const [correctLetters, setCorrectLetters] = useState(0);
  const [totalLetters, setTotalLetters] = useState(0);
  const [gameCleared, setGameCleared] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
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
    setScore(score);
    setCorrectLetters(correctLetters);
    setTotalLetters(totalLetters);
    setMistakes(mistakes);
    setElapsedTime(elapsedTime);
    setGameCleared(gameCleared);
    setGameState("result");
  };

  const handleRestart = () => {
    setGameState("start");
  };

  return (
    <div className="app">
      {gameState === "start" && <StartScreen onStart={handleStart} />}
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
          score={score}
          correctLetters={correctLetters}
          totalLetters={totalLetters}
          mistakes={mistakes}
          elapsedTime={elapsedTime}
          gameCleared={gameCleared}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
};

export default App;
