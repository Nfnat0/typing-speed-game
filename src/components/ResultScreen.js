// ResultScreen.js
import React from 'react';

const ResultScreen = ({ score, correctLetters, totalLetters, mistakes, elapsedTime, gameCleared, onRestart }) => {
  const percentage = ((correctLetters / totalLetters) * 100).toFixed(2);

  return (
    <div className="screen">
      <div className="info">
        <h1>{gameCleared ? 'GameClear!' : 'GameOver!'}</h1>
      </div>
      <div className="main">
        <table className="result-table">
          <tbody>
            <tr>
              <td>Score:</td>
              <td>{score}</td>
            </tr>
            <tr>
              <td>Accuracy:</td>
              <td>{percentage}%</td>
            </tr>
            <tr>
              <td>Mistakes:</td>
              <td>{mistakes}</td>
            </tr>
            <tr>
              <td>Elapsed Time:</td>
              <td>{elapsedTime} seconds</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="buttons">
        <button onClick={onRestart}>Play Again</button>
      </div>
    </div>
  );
};

export default ResultScreen;
