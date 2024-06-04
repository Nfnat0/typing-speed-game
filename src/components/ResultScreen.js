import React from 'react';

const ResultScreen = ({ score, onRestart }) => {
  return (
    <div>
      <h1>Game Over</h1>
      <p>Your score: {score}</p>
      <button onClick={onRestart}>Play Again</button>
    </div>
  );
};

export default ResultScreen;
