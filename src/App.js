import React, { useState } from 'react';
import './App.css';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import ResultScreen from './components/ResultScreen';

const App = () => {
  const [gameState, setGameState] = useState('start'); // 'start', 'playing', 'result'
  const [score, setScore] = useState(0);

  const handleStart = () => {
    setGameState('playing');
  };

  const handleGameOver = (score) => {
    setScore(score);
    setGameState('result');
  };

  return (
    <div>
      {gameState === 'start' && <StartScreen onStart={handleStart} />}
      {gameState === 'playing' && <GameScreen onGameOver={handleGameOver} />}
      {gameState === 'result' && <ResultScreen score={score} onRestart={handleStart} />}
    </div>
  );
};

export default App;
