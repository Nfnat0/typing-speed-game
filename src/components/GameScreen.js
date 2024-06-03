import React, { useState, useEffect } from 'react';

const words = ['example', 'random', 'words', 'for', 'typing', 'speed', 'game'];

const GameScreen = () => {
  const [currentWord, setCurrentWord] = useState('');
  const [remainingWords, setRemainingWords] = useState(words);

  useEffect(() => {
    if (remainingWords.length > 0) {
      setCurrentWord(remainingWords[0]);
    }
  }, [remainingWords]);

  const handleInputChange = (e) => {
    if (e.target.value === currentWord) {
      setRemainingWords(remainingWords.slice(1));
      e.target.value = '';
    }
  };

  return (
    <div>
      <h2>{currentWord}</h2>
      <input type="text" onChange={handleInputChange} />
    </div>
  );
};

export default GameScreen;
