import { combineReducers } from 'redux';
import user from './userReducer';
import trivia from './triviaReducer';
import player from './player';
import feedback from './feedbackReducer';

const rootReducer = combineReducers({
  user,
  trivia,
  player,
  feedback,
});

export default rootReducer;
