export const calculateScore = (
  elapsedTime,
  totalLetters,
  correctLetters,
  mistakes
) => {
  const accuracy = (correctLetters / totalLetters) * 100;
  return Math.round(((correctLetters - mistakes) * accuracy) / elapsedTime);
};
