import fetchPlayerToken from '../helpers/api';
import saveToken from '../helpers/localStorage';

export const FETCH_USER_INFO = 'FETCH_USER_INFO';
export const FETCH_API_SUCCESS = 'FETCH_API_SUCCESS';
export const FETCH_ERROR = 'FETCH_ERROR';

const userInfo = (email, name) => ({
  type: FETCH_USER_INFO,
  email,
  name,
});

// const fetchSuccess = (payload) => ({
//   type: FETCH_API_SUCCESS,
//   payload,
// });

const fetchError = (error) => ({
  type: FETCH_ERROR,
  error,
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
