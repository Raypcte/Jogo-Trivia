import calculatePoints from "../helpers/pointsScored";

describe('Test heplers stuff', () => {
  it('Test calculatePoints function', () => {
    let difficulty = 'easy';
    expect(calculatePoints(difficulty)).toEqual(1);
    difficulty = 'medium';
    expect(calculatePoints(difficulty)).toEqual(2);
    difficulty = 'hard';
    expect(calculatePoints(difficulty)).toEqual(3);
    expect(calculatePoints(null)).toEqual(undefined);
  });
});
