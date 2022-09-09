import fetchPlayerToken from '../helpers/api';
import saveToken from '../helpers/localStorage';

export const FETCH_USER_INFO = 'FETCH_USER_INFO';
export const FETCH_TIMER = 'FETCH_TIMER';
export const FETCH_ANSWERED = 'FETCH_ANSWERED';
export const FETCH_ERROR = 'FETCH_ERROR';
export const FETCH_SCORE = 'FETCH_SCORE';
export const FETCH_FEEDBACK = 'FETCH_FEEDBACK';

const userInfo = (email, name) => ({
  type: FETCH_USER_INFO,
  email,
  name,
});

const fetchError = (error) => ({
  type: FETCH_ERROR,
  error,
});

export const questionAnswered = (answered) => ({
  type: FETCH_ANSWERED,
  answered,
});

export const questionTimer = (timer) => ({
  type: FETCH_TIMER,
  timer,
});

export const fetchScore = (score) => ({
  type: FETCH_SCORE,
  score,
});

export const fetchFeedback = (score) => ({
  type: FETCH_FEEDBACK,
  score,
});

const userInfoThunk = (email, name) => async (dispatch) => {
  dispatch(userInfo(email, name));
  try {
    const PLAYER_TOKEN = await fetchPlayerToken();
    saveToken(PLAYER_TOKEN.token);
  } catch (error) {
    dispatch(fetchError(error.message));
  }
};

export default userInfoThunk;
