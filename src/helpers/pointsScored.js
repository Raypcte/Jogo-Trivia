const EASY = 1;
const MEDIUM = 2;
const HARD = 3;

const calculatePoints = (difficulty) => {
  if (difficulty === 'easy') return EASY;
  if (difficulty === 'medium') return MEDIUM;
  if (difficulty === 'hard') return HARD;
};

export default calculatePoints;
