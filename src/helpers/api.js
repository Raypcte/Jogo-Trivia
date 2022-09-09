const fetchPlayerToken = async () => {
  const endpoint = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
};

export const fetchTriviaQuestions = async (token) => {
  const endpoint = `https://opentdb.com/api.php?amount=5&token=${token.token}`;
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
};

export default fetchPlayerToken;
