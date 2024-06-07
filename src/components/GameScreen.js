// GameScreen.js
import React, { useState, useEffect, useCallback, useRef } from "react";
import Timer from "./Timer";
import { calculateScore } from "../scoreCalculator";
import { fetchSentence } from "../sentenceFetcher";
import "./GameScreen.css"; // Import the new CSS file

const GameScreen = ({ genre, onGameOver, inputRef, onRestart }) => {
  const [originalSentence, setOriginalSentence] = useState("");
  const [currentSentence, setCurrentSentence] = useState("");
  const [time, setTime] = useState(60); // Set the game duration in seconds
  const [elapsedTime, setElapsedTime] = useState(0);
  const [correctLetters, setCorrectLetters] = useState(0);
  const [totalLetters, setTotalLetters] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [mistakes, setMistakes] = useState(0);
  const sentenceFetched = useRef(false); // Ref to track if the sentence has been fetched

  // Timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
      setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Fetch sentence logic
  useEffect(() => {
    const fetchAndSetSentence = async () => {
      const sentence = await fetchSentence(genre);
      setOriginalSentence(sentence);
      setCurrentSentence(sentence.replace(/\s/g, "").toLowerCase());
    };

    if (!sentenceFetched.current) {
      fetchAndSetSentence();
      sentenceFetched.current = true; // Set ref to true after fetching
    }
  }, [genre]);

  // Handle game over when sentence is completed
  useEffect(() => {
    if (currentSentence.length === 0 && originalSentence.length > 0) {
      const score = calculateScore(elapsedTime, totalLetters, correctLetters);
      onGameOver(
        score,
        correctLetters,
        totalLetters,
        mistakes,
        elapsedTime,
        true
      ); // Game cleared
    }
  }, [
    currentSentence,
    elapsedTime,
    totalLetters,
    correctLetters,
    onGameOver,
    originalSentence,
    mistakes,
  ]);

  // Handle game over when time runs out
  useEffect(() => {
    if (time <= 0) {
      const score = calculateScore(elapsedTime, totalLetters, correctLetters);
      onGameOver(
        score,
        correctLetters,
        totalLetters,
        mistakes,
        elapsedTime,
        false
      ); // Time's up
    }
  }, [time, elapsedTime, onGameOver, totalLetters, correctLetters, mistakes]);

  // Handle key press events
  const handleKeyPress = useCallback(
    (e) => {
      const char = e.key.toLowerCase();
      setTotalLetters((prevTotalLetters) => prevTotalLetters + 1);

      if (currentSentence.startsWith(inputValue + char)) {
        setInputValue((prevInputValue) => prevInputValue + char);
        if (inputValue + char === currentSentence) {
          setCorrectLetters(
            (prevCorrectLetters) =>
              prevCorrectLetters + (inputValue + char).length
          );
          setCurrentSentence("");
          setInputValue("");
        }
      } else {
        setMistakes((prevMistakes) => prevMistakes + 1);
      }
    },
    [currentSentence, inputValue]
  );

  // Add and remove event listener for key presses
  useEffect(() => {
    window.addEventListener("keypress", handleKeyPress);
    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [handleKeyPress]);

  // Focus the input field
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  // Render the sentence with typed letters highlighted
  const renderSentence = () => {
    let typedIndex = 0;
    return originalSentence.split("").map((char, index) => {
      const isSpace = char === " ";
      const isTyped = !isSpace && typedIndex < inputValue.length;
      if (!isSpace) typedIndex++;

      return (
        <span key={index} style={{ color: isTyped ? "yellow" : "white" }}>
          {char}
        </span>
      );
    });
  };

  const forceEndGame = () => {
    const score = calculateScore(elapsedTime, totalLetters, correctLetters);
    onGameOver(
      score,
      correctLetters,
      totalLetters,
      mistakes,
      elapsedTime,
      false
    ); // Force transition to result screen
  };

  return (
    <div className="screen game-screen">
      <div className="info">
        <div>
          <Timer time={time} />
        </div>
        <div>
          <h3>Questions Remaining: {currentSentence.length > 0 ? 1 : 0}</h3>
        </div>
        <div>
          <h3>Mistakes: {mistakes}</h3>
        </div>
      </div>
      <div className="main">
        <h2>{renderSentence()}</h2>
        <input
          type="text"
          value={inputValue}
          onChange={() => {}}
          className="input-field invisible-input"
          ref={inputRef}
        />
      </div>
      <div className="buttons">
        <button onClick={onRestart}>Restart</button>
        <button onClick={forceEndGame}>End Game</button>
      </div>
    </div>
  );
};

export default GameScreen;
