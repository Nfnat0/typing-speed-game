// StatisticsScreen.js
import React from "react";
import "./StatisticsScreen.css";
import { CSVLink } from "react-csv";

const StatisticsScreen = ({ history, onBackToStart }) => {
  const csvData = history.map((entry) => ({
    "Date and Time": entry.date.toLocaleString(),
    Score: entry.score,
    "Accuracy (%)": entry.accuracy,
    "Total Characters": entry.totalLetters,
    "Elapsed Time (s)": entry.elapsedTime,
  }));

  const headers = [
    { label: "Date and Time", key: "Date and Time" },
    { label: "Score", key: "Score" },
    { label: "Accuracy (%)", key: "Accuracy (%)" },
    { label: "Total Characters", key: "Total Characters" },
    { label: "Elapsed Time (s)", key: "Elapsed Time (s)" },
  ];

  return (
    <div className="screen statistics-screen">
      <div className="info">
        <h3>Game Statistics</h3>
      </div>
      <div className="main">
        <table>
          <thead>
            <tr>
              <th>Date and Time</th>
              <th>Score</th>
              <th>Accuracy(%)</th>
              <th>Total</th>
              <th>Mistakes</th>
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
                <td>{entry.mistakes}</td>
                <td>{entry.elapsedTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="buttons">
        <button onClick={onBackToStart}>Back to Start</button>
        <CSVLink
          data={csvData}
          headers={headers}
          filename={"game_statistics.csv"}
        >
          <button>Download CSV</button>
        </CSVLink>
      </div>
    </div>
  );
};

export default StatisticsScreen;
