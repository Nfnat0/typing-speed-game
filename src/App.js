import React, { useState } from 'react';
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

  const handleStart = () => {
    setGameState('playing');
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
      {gameState === 'playing' && <GameScreen onGameOver={handleGameOver} />}
      {gameState === 'result' && <ResultScreen score={score} correctLetters={correctLetters} totalLetters={totalLetters} gameCleared={gameCleared} onRestart={handleStart} />}
    </div>
  );
};

export default App;
