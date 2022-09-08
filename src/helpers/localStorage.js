const TOKEN_KEY = 'token';

const readToken = () => {
  if (!JSON.parse(localStorage.getItem(TOKEN_KEY))) {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(''));
  }
  return JSON.parse(localStorage.getItem(TOKEN_KEY));
};

const saveToken = (token) => localStorage
  .setItem(TOKEN_KEY, token);

export const getToken = () => readToken();

export default saveToken;
