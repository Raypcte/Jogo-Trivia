import { FETCH_SCORE } from '../actions';

const initialState = {
  score: 0,
};

const triviaReducer = (state = initialState, { type, score }) => {
  switch (type) {
  case FETCH_SCORE:
    return {
      ...state,
      score,
    };
  default:
    return {
      ...state,
    };
  }
};

export default triviaReducer;
