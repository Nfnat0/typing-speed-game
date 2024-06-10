// ResultScreen.js
import React from "react";
import "./ResultScreen.css";

const ResultScreen = ({ history, onRestart, onViewStatistics }) => {
  const latestEntry = history[0]; // Get the latest entry from the history

  return (
    <div className="screen result-screen">
      <div className="info">
        <h1>{latestEntry.gameCleared ? "GameClear!" : "GameOver!"}</h1>
      </div>
      <div className="main">
        <table className="result-table">
          <tbody>
            <tr>
              <td>Score:</td>
              <td>{latestEntry.score}</td>
            </tr>
            <tr>
              <td>Accuracy:</td>
              <td>{latestEntry.accuracy}%</td>
            </tr>
            <tr>
              <td>Total Characters:</td>
              <td>{latestEntry.totalLetters}</td>
            </tr>
            <tr>
              <td>Mistakes:</td>
              <td>{latestEntry.mistakes}</td>
            </tr>
            <tr>
              <td>Elapsed Time:</td>
              <td>{latestEntry.elapsedTime}s</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="buttons">
        <button onClick={onRestart}>Play Again</button>
        <button onClick={onViewStatistics}>View Statistics</button>
      </div>
    </div>
  );
};

export default ResultScreen;
