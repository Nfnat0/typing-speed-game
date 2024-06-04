import React, { useState, useEffect, useRef } from 'react';
import Timer from './Timer';
import WordCounter from './WordCounter';
import { words } from '../words';

const GameScreen = ({ onGameOver, inputRef }) => {
  const [currentWord, setCurrentWord] = useState('');
  const [remainingWords, setRemainingWords] = useState(words);
  const [time, setTime] = useState(60); // Set the game duration in seconds
  const [score, setScore] = useState(0);
  const [correctLetters, setCorrectLetters] = useState(0);
  const [totalLetters, setTotalLetters] = useState(0);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (remainingWords.length > 0) {
      setCurrentWord(remainingWords[0].replace(/\s/g, '').toLowerCase());
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
    const value = e.target.value.toLowerCase();
    const lastChar = value[value.length - 1];

    setTotalLetters(totalLetters + 1);

    if (currentWord.startsWith(inputValue + lastChar)) {
      setInputValue(inputValue + lastChar);
      if (inputValue + lastChar === currentWord) {
        setScore(score + 1);
        setCorrectLetters(correctLetters + (inputValue + lastChar).length);
        setRemainingWords(remainingWords.slice(1));
        setInputValue('');
      }
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const renderWord = () => {
    return currentWord.split('').map((char, index) => {
      return (
        <span key={index} style={{ color: index < inputValue.length ? 'yellow' : 'white' }}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="game-screen">
      <Timer time={time} />
      <WordCounter count={remainingWords.length} />
      <h2>{renderWord()}</h2>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className="input-field"
        ref={inputRef}
      />
    </div>
  );
};

export default GameScreen;
