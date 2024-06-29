export const calculateScore = (
  elapsedTime,
  totalLetters,
  correctLetters,
  mistakes
) => {
  const k = 1.1;
  const c = 1;

  const accuracy = (100 * correctLetters) / totalLetters;

  const totalCharsWeighted = Math.pow(correctLetters, k);

  const score = ((accuracy * totalCharsWeighted) / elapsedTime) * c;

  return Math.round(score);
};
