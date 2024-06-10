// StatisticsScreen.js
import React from "react";

const StatisticsScreen = ({ onBackToStart }) => {
  return (
    <div className="screen">
      <div className="info">
        <h1>Game Statistics</h1>
      </div>
      <div className="main">
        <p>Statistics will be displayed here...</p>
      </div>
      <div className="buttons">
        <button onClick={onBackToStart}>Back</button>
      </div>
    </div>
  );
};

export default StatisticsScreen;
