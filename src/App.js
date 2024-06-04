import React, { useState, useRef } from 'react';
import './App.css';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import ResultScreen from './components/ResultScreen';

const App = () => {
  const [gameState, setGameState] = useState('start'); // 'start', 'playing', 'result'
  const [score, setScore] = useState(0);
  const [correctLetters, setCorrectLetters] = useState(0);
  const [totalLetters, setTotalLetters] = useState(0);
  const [gameCleared, setGameCleared] = useState(false);
  const inputRef = useRef(null);

  const handleStart = () => {
    setGameState('playing');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleGameOver = (score, correctLetters, totalLetters, gameCleared) => {
    setScore(score);
    setCorrectLetters(correctLetters);
    setTotalLetters(totalLetters);
    setGameCleared(gameCleared);
    setGameState('result');
  };

  return (
    <div className="app">
      {gameState === 'start' && <StartScreen onStart={handleStart} />}
      {gameState === 'playing' && <GameScreen onGameOver={handleGameOver} inputRef={inputRef} />}
      {gameState === 'result' && <ResultScreen score={score} correctLetters={correctLetters} totalLetters={totalLetters} gameCleared={gameCleared} onRestart={handleStart} />}
    </div>
  );
};

export default App;
