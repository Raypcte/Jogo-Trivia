const initialState = {
  email: '',
  name: '',
};

const userReducer = (state = initialState, { type, email, name }) => {
  switch (type) {
  case 'FETCH_USER_INFO':
    return {
      ...state,
      email,
      name,
    };
  default:
    return {
      ...state,
    };
  }
};

export default userReducer;
