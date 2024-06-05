export const calculateScore = (elapsedTime, totalLetters, correctLetters) => {
    const accuracy = correctLetters / totalLetters;
    return Math.round((correctLetters / elapsedTime) * accuracy * 10);
    };