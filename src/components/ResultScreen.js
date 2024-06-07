// ResultScreen.js
import React from 'react';

const ResultScreen = ({ score, correctLetters, totalLetters, mistakes, elapsedTime, gameCleared, onRestart }) => {
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
              <td>Correct Letters:</td>
              <td>{correctLetters}</td>
            </tr>
            <tr>
              <td>Total Letters:</td>
              <td>{totalLetters}</td>
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
