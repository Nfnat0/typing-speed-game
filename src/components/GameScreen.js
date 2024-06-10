// GameScreen.js
import React, { useState, useEffect, useCallback, useRef } from "react";
import { calculateScore } from "../scoreCalculator";
import { fetchSentence } from "../sentenceFetcher";
import "./GameScreen.css"; // Import the new CSS file

const GameScreen = ({
  genre,
  repetitions,
  onGameOver,
  inputRef,
  onRestart,
}) => {
  const [sentences, setSentences] = useState([]);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [currentSentence, setCurrentSentence] = useState("");
  const [time, setTime] = useState(60); // Set the game duration in seconds
  const [elapsedTime, setElapsedTime] = useState(0);
  const [correctLetters, setCorrectLetters] = useState(0);
  const [totalLetters, setTotalLetters] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [mistakes, setMistakes] = useState(0);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const sentenceFetched = useRef(false); // Ref to track if the sentence has been fetched
  const timerRef = useRef(null); // Ref to hold the timer

  // Timer logic
  useEffect(() => {
    if (!loading && !error) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }, 1000);
      return () => clearInterval(timerRef.current);
    }
  }, [loading, error]);

  // Fetch sentences logic
  useEffect(() => {
    const fetchAndSetSentences = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedSentences = [];
        for (let i = 0; i < repetitions; i++) {
          const sentence = await fetchSentence(genre);
          fetchedSentences.push(sentence || "Error fetching sentence.");
        }
        setSentences(fetchedSentences);
        setCurrentSentence(
          fetchedSentences[0].replace(/\s/g, "").toLowerCase()
        );
        setLoading(false);
      } catch (error) {
        console.error("Error fetching sentences:", error);
        setError("Error fetching sentences. Please try again.");
        setLoading(false);
      }
    };

    if (!sentenceFetched.current) {
      fetchAndSetSentences();
      sentenceFetched.current = true; // Set ref to true after fetching
    }
  }, [genre, repetitions]);

  // Handle game over when all sentences are completed
  useEffect(() => {
    if (
      currentSentence.length === 0 &&
      sentences.length === repetitions &&
      currentSentenceIndex >= repetitions - 1
    ) {
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
    currentSentenceIndex,
    elapsedTime,
    totalLetters,
    correctLetters,
    onGameOver,
    sentences,
    repetitions,
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
          setInputValue("");
          if (currentSentenceIndex < repetitions - 1) {
            setCurrentSentenceIndex((prevIndex) => prevIndex + 1);
            setCurrentSentence(
              sentences[currentSentenceIndex + 1]
                .replace(/\s/g, "")
                .toLowerCase()
            );
          } else {
            setCurrentSentence(""); // This will trigger the game over effect
          }
        }
      } else {
        setMistakes((prevMistakes) => prevMistakes + 1);
      }
    },
    [currentSentence, inputValue, currentSentenceIndex, sentences, repetitions]
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
    return sentences[currentSentenceIndex]?.split("").map((char, index) => {
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

  if (loading) {
    return (
      <div className="screen game-screen">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="screen game-screen">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="screen game-screen">
      <div className="info">
        <div>
          <h3>
            Time: <span style={{ color: "yellow" }}>{time}</span>s
          </h3>
        </div>
        <div>
          <h3>Questions Remaining: {repetitions - currentSentenceIndex}</h3>
        </div>
        <div>
          <h3>Mistakes: {<span style={{ color: "red" }}>{mistakes}</span>}</h3>
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
