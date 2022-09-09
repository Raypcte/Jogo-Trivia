import { FETCH_FEEDBACK } from '../actions';

const initialState = {
  score: 0,
};

const feedbackReducer = (state = initialState, { type, score }) => {
  switch (type) {
  case FETCH_FEEDBACK:
    return {
      ...state,
      score: state.score + score,
    };
  default:
    return {
      ...state,
    };
  }
};

export default feedbackReducer;
