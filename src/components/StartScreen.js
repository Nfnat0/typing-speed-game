import React from 'react';

const StartScreen = ({ onStart }) => {
  return (
    <div>
      <h1>Typing Speed Game</h1>
      <p>Test your typing speed by typing the displayed words as fast as you can.</p>
      <button onClick={onStart}>Play</button>
    </div>
  );
};

export default StartScreen;
