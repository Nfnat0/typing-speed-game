export const calculateScore = (elapsedTime, totalLetters, correctLetters) => {
    const accuracy = correctLetters / totalLetters;
    const accuracyBonus = accuracy * 100;
    const timeBonus = correctLetters / elapsedTime;
    return Math.round(accuracyBonus * timeBonus);
    };