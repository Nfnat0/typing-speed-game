// StatisticsScreen.js
import React from "react";
import "./StatisticsScreen.css";

const StatisticsScreen = ({ history, onBackToStart }) => {
  return (
    <div className="screen statistics-screen">
      <div className="info">
        <h1>Game Statistics</h1>
      </div>
      <div className="main">
        <table>
          <thead>
            <tr>
              <th>Date and Time</th>
              <th>Score</th>
              <th>Accuracy(%)</th>
              <th>Total</th>
              <th>Time(s)</th>
            </tr>
          </thead>
          <tbody>
            {history.map((entry, index) => (
              <tr key={index}>
                <td>{entry.date.toLocaleString()}</td>
                <td>{entry.score}</td>
                <td>{entry.accuracy}</td>
                <td>{entry.totalLetters}</td>
                <td>{entry.elapsedTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="buttons">
        <button onClick={onBackToStart}>Back to Start</button>
      </div>
    </div>
  );
};

export default StatisticsScreen;
