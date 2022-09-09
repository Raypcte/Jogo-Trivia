import { FETCH_ANSWERED, FETCH_TIMER } from '../actions';

const initialState = {
  timer: 30,
  answered: false,
};

const triviaReducer = (state = initialState, { type, timer, answered }) => {
  switch (type) {
  case FETCH_TIMER:
    return {
      ...state,
      timer,
    };
  case FETCH_ANSWERED:
    return {
      ...state,
      answered,
    };
  default:
    return {
      ...state,
    };
  }
};

export default triviaReducer;
