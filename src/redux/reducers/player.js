import { FETCH_SCORE, FETCH_ASSERTIONS } from '../actions';

const initialState = {
  score: 0,
  assertions: 0,
};

const triviaReducer = (state = initialState, { type, score, assertions }) => {
  switch (type) {
  case FETCH_SCORE:
    return {
      ...state,
      score,
    };
  case FETCH_ASSERTIONS:
    return {
      ...state,
      assertions: state.assertions + assertions,
    };
  default:
    return {
      ...state,
    };
  }
};

export default triviaReducer;
