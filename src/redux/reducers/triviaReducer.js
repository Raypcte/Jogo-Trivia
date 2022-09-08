const initialState = {
  token: '',
  error: null,
};

const triviaReducer = (state = initialState, { type, payload, error }) => {
  switch (type) {
  case 'FETCH_API_SUCCESS':
    console.log(payload);
    return {
      ...state,
      token: payload,
    };
  case 'FETCH_ERROR':
    return {
      ...state,
      error,
    };
  default:
    return {
      ...state,
    };
  }
};

export default triviaReducer;
