import { combineReducers } from 'redux';
import user from './userReducer';
import trivia from './triviaReducer';
import player from './player';

const rootReducer = combineReducers({
  user,
  trivia,
  player,
});

export default rootReducer;
