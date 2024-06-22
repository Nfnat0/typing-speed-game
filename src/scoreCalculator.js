export const calculateScore = (
  elapsedTime,
  totalLetters,
  correctLetters,
  mistakes
) => {
  const accuracy = (correctLetters / totalLetters) * 100;
  return Math.round(
    (Math.pow(correctLetters - mistakes, 1.1) * accuracy) / elapsedTime
  );
};
