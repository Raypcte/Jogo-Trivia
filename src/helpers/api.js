const fetchPlayerToken = async () => {
  const endpoint = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
};

// const fetchTriviaQuestions = async () => {

// }

export default fetchPlayerToken;
