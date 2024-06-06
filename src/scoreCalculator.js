export const calculateScore = (elapsedTime, totalLetters, correctLetters) => {
    const accuracy = correctLetters / totalLetters;
    const accuracyBonus = accuracy * 100;
    const timeBonus = 100 / elapsedTime;
    return Math.round(accuracyBonus * timeBonus);
    };