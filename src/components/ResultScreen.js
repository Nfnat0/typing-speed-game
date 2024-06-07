// ResultScreen.js
import React from 'react';
import './ResultScreen.css';

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
              <td>{score || 0}</td>
            </tr>
            <tr>
              <td>Accuracy:</td>
              <td>{isNaN(percentage) ? 0 : percentage}%</td>
            </tr>
            <tr>
              <td>Mistakes:</td>
              <td>{mistakes || 0}</td>
            </tr>
            <tr>
              <td>Elapsed Time:</td>
              <td>{elapsedTime || 0} seconds</td>
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
