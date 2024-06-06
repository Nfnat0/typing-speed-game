import React, { useState, useEffect, useCallback } from 'react';
import Timer from './Timer';
import WordCounter from './WordCounter';
import { calculateScore } from '../scoreCalculator';
import { fetchSentence } from '../sentenceFetcher';

const GameScreen = ({ onGameOver, inputRef }) => {
  const [originalSentence, setOriginalSentence] = useState('');
  const [currentSentence, setCurrentSentence] = useState('');
  const [time, setTime] = useState(60); // Set the game duration in seconds
  const [elapsedTime, setElapsedTime] = useState(0);
  const [correctLetters, setCorrectLetters] = useState(0);
  const [totalLetters, setTotalLetters] = useState(0);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const fetchAndSetSentence = async () => {
      const sentence = await fetchSentence();
      setOriginalSentence(sentence);
      setCurrentSentence(sentence.replace(/\s/g, '').toLowerCase());
    };

    fetchAndSetSentence();
  }, []);

  useEffect(() => {
    if (currentSentence.length === 0 && originalSentence.length > 0) {
      const score = calculateScore(elapsedTime, totalLetters, correctLetters);
      onGameOver(score, correctLetters, totalLetters, true); // Game cleared
    }
  }, [currentSentence, elapsedTime, totalLetters, correctLetters, onGameOver, originalSentence]);

  useEffect(() => {
    if (time > 0) {
      const timer = setInterval(() => {
        setTime(time - 1);
        setElapsedTime(prevElapsedTime => prevElapsedTime + 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      const score = calculateScore(elapsedTime, totalLetters, correctLetters);
      onGameOver(score, correctLetters, totalLetters, false); // Time's up
    }
  }, [time, elapsedTime, onGameOver, totalLetters, correctLetters]);

  const handleKeyPress = useCallback((e) => {
    const char = e.key.toLowerCase();
    setTotalLetters(prevTotalLetters => prevTotalLetters + 1);

    if (currentSentence.startsWith(inputValue + char)) {
      setInputValue(prevInputValue => prevInputValue + char);
      if (inputValue + char === currentSentence) {
        setCorrectLetters(prevCorrectLetters => prevCorrectLetters + (inputValue + char).length);
        setCurrentSentence('');
        setInputValue('');
      }
    }
  }, [currentSentence, inputValue]);

  useEffect(() => {
    window.addEventListener('keypress', handleKeyPress);
    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [handleKeyPress]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const renderSentence = () => {
    let typedIndex = 0;
    return originalSentence.split('').map((char, index) => {
      const isSpace = char === ' ';
      const isTyped = !isSpace && typedIndex < inputValue.length;
      if (!isSpace) typedIndex++;

      return (
        <span key={index} style={{ color: isTyped ? 'yellow' : 'white' }}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="game-screen">
      <Timer time={time} />
      <WordCounter count={originalSentence.replace(/\s/g, '').length} />
      <h2>{renderSentence()}</h2>
      <input
        type="text"
        value={inputValue}
        onChange={() => {}}
        className="input-field invisible-input"
        ref={inputRef}
      />
    </div>
  );
};

export default GameScreen;
