import React, { useState } from 'react';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';

const App = () => {
  const [gameState, setGameState] = useState('start'); // 'start', 'playing', 'result'

  const handleStart = () => {
    setGameState('playing');
  };

  return (
    <div>
      {gameState === 'start' && <StartScreen onStart={handleStart} />}
      {gameState === 'playing' && <GameScreen />}
    </div>
  );
};

export default App;
