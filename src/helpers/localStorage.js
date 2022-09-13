const TOKEN_KEY = 'token';

const saveToken = (token) => localStorage
  .setItem(TOKEN_KEY, token);

export default saveToken;
