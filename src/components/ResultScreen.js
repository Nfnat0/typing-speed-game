import React from 'react';

const ResultScreen = ({ score, correctLetters, totalLetters, gameCleared, onRestart }) => {
  const percentage = ((correctLetters / totalLetters) * 100).toFixed(2);

  return (
    <div className="result-screen">
      <h1>{gameCleared ? 'GameClear' : 'GameOver'}</h1>
      <p>Your score: {score}</p>
      <p>Accuracy: {percentage}%</p>
      <button onClick={onRestart}>Play Again</button>
    </div>
  );
};

export default ResultScreen;
