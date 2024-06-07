// StartScreen.js
import React from 'react';

const StartScreen = ({ onStart }) => {
  return (
    <div className="screen">
      <div className="info">
        <h1>Typing Speed Game</h1>
      </div>
      <div className="main">
        <p>Welcome to the Typing Speed Game. Test your typing skills and improve your speed. Press play to start the game.</p>
      </div>
      <div className="buttons">
        <button onClick={onStart}>Play</button>
      </div>
    </div>
  );
};

export default StartScreen;
