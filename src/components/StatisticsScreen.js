// StatisticsScreen.js
import React, { useState, useEffect } from "react";
import "./StatisticsScreen.css";
import { CSVLink } from "react-csv";
import { checkLoginStatus, syncWithCloudAPI } from "../api";

const StatisticsScreen = ({ history, onBackToStart, onClearHistory }) => {
  const [highScore, setHighScore] = useState(0);
  const [totalCharacters, setTotalCharacters] = useState(0);
  // const [syncMessage, setSyncMessage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  useEffect(() => {
    const calculateHighScore = () => {
      const maxScore =
        history.length > 0
          ? Math.max(...history.map((entry) => entry.score))
          : 0;
      setHighScore(maxScore);
    };

    const calculateTotalCharacters = () => {
      const total =
        history.length > 0
          ? history.reduce((sum, entry) => sum + entry.totalLetters, 0)
          : 0;
      setTotalCharacters(total);
    };

    calculateHighScore();
    calculateTotalCharacters();
  }, [history]);

  const handleClear = () => {
    if (window.confirm("Are you sure you want to clear the history?")) {
      onClearHistory();
    }
  };

  const handleSync = async () => {
    const loginStatus = await checkLoginStatus();
    if (!loginStatus.isLoggedIn) {
      setDialogMessage("You need to be logged in to sync.");
      setIsDialogOpen(true);
      return;
    }

    const syncCount = localStorage.getItem("syncCount") || 0;
    if (syncCount >= 5) {
      setDialogMessage("You can sync up to 5 times a day.");
      setIsDialogOpen(true);
      return;
    }

    setDialogMessage("Synchronizing with cloud...");
    setIsDialogOpen(true);

    try {
      const data = await syncWithCloudAPI(
        highScore,
        totalCharacters,
        loginStatus.userId
      );
      setHighScore(data.highScore);
      setTotalCharacters(data.totalCharacters);
      localStorage.setItem("syncCount", syncCount + 1);
      setDialogMessage("Synchronization successful");
    } catch (error) {
      console.error("Error during synchronization:", error);
      setDialogMessage("Synchronization failed");
    }
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const csvData = history.map((entry) => ({
    "Date and Time": entry.date.toLocaleString("ja-JP"),
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
        <h1 className="title">
          High Score: {highScore} &nbsp; Total Characters: {totalCharacters}
        </h1>
        <button className="clear-button" onClick={handleClear}>
          Clear
        </button>
      </div>
      <div className="main table-container">
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
                <td>{entry.date.toLocaleString("ja-JP")}</td>
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
        <button className="sync-button" onClick={handleSync}>
          Sync with Cloud
        </button>
      </div>
      {/* {syncMessage && <p className="sync-message">{syncMessage}</p>} */}
      {isDialogOpen && (
        <div className="dialog">
          <div className="dialog-content">
            <p>{dialogMessage}</p>
            <button onClick={closeDialog}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatisticsScreen;
