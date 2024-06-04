import React, { useState, useEffect } from 'react';
import Timer from './Timer';
import WordCounter from './WordCounter';

const words = ['example', 'random', 'words', 'for', 'typing', 'speed', 'game'];

const GameScreen = ({ onGameOver }) => {
  const [currentWord, setCurrentWord] = useState('');
  const [remainingWords, setRemainingWords] = useState(words);
  const [time, setTime] = useState(60); // Set the game duration in seconds
  const [score, setScore] = useState(0);
  const [correctLetters, setCorrectLetters] = useState(0);
  const [totalLetters, setTotalLetters] = useState(0);

  useEffect(() => {
    if (remainingWords.length > 0) {
      setCurrentWord(remainingWords[0]);
    } else {
      onGameOver(score, correctLetters, totalLetters, true); // Game cleared
    }
  }, [remainingWords, score, correctLetters, totalLetters, onGameOver]);

  useEffect(() => {
    if (time > 0) {
      const timer = setInterval(() => {
        setTime(time - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      onGameOver(score, correctLetters, totalLetters, false); // Time's up
    }
  }, [time, onGameOver, score, correctLetters, totalLetters]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setTotalLetters(totalLetters + 1);
    if (value === currentWord) {
      setScore(score + 1);
      setCorrectLetters(correctLetters + value.length);
      setRemainingWords(remainingWords.slice(1));
      e.target.value = '';
    }
  };

  return (
    <div className="game-screen">
      <Timer time={time} />
      <WordCounter count={remainingWords.length} />
      <h2>{currentWord}</h2>
      <input type="text" onChange={handleInputChange} className="input-field" />
    </div>
  );
};

export default GameScreen;