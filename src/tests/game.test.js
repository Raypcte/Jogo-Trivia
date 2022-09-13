import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import triviaSuccess, { triviaFailed } from "./mock";

describe('Test the Game page', () => {
  const initialState = {
    user: {
      email: '',
      name: ''
    },
    trivia: {
      timer: 30,
      answered: false
    },
    player: {
      score: 0,
      assertions: 0
    }
  };
  const userInfo = {
    email: 'user@test.com',
    name: 'User',
  }

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Test if the button redirects to the Settings page', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    userEvent.type(screen.getByTestId('input-gravatar-email'), userInfo.email);
    userEvent.type(screen.getByTestId('input-player-name'), userInfo.name);
    userEvent.click(screen.getByTestId('btn-play'));
    userEvent.click(screen.getByTestId('btn-settings'));
    expect(history.location.pathname).toBe('/settings');
  });
  test('Test if fetch is called', () => {
    const endpoint = 'https://opentdb.com/api_token.php?command=request';

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(triviaSuccess),
    });
    renderWithRouterAndRedux(<App />, initialState, '/game');

    expect(global.fetch).toBeCalled();
    expect(global.fetch).toBeCalledWith(endpoint);
  });
  test('Test if the player is disconnected in case of response code 3', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(triviaFailed),
    });
    const { history } = renderWithRouterAndRedux(<App />, initialState, '/game');

    expect(global.fetch).toBeCalled();
    await waitFor(() => expect(history.location.pathname).toBe('/'));
  });
  test('Test game functionality', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(triviaSuccess),
    });
    renderWithRouterAndRedux(<App />, initialState, '/game');

    expect(global.fetch).toBeCalled();

    expect(await screen.findByTestId('question-category'))
      .toHaveTextContent(triviaSuccess.results[0].category);
    expect(await screen.findByTestId('question-text'))
      .toHaveTextContent(triviaSuccess.results[0].question);
    expect(await screen.findByTestId('answer-options'))
      .toHaveTextContent(...triviaSuccess.results[0].incorrect_answers, 
      triviaSuccess.results[0].correct_answer);
    expect(await screen.findByTestId('correct-answer'))
      .toHaveTextContent(triviaSuccess.results[0].correct_answer);
  });
  test('Test game functionality - correct answers', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(triviaSuccess),
    });
    renderWithRouterAndRedux(<App />, initialState, '/game');

    userEvent.click(await screen.findByTestId('correct-answer'));
    expect(screen.getByTestId('header-score')).toHaveTextContent(41);
  });
  test('Test game functionality - incorrect answers', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(triviaSuccess),
    });

    const { store } = renderWithRouterAndRedux(<App />, initialState, '/game');

    userEvent.click(await screen
      .findByText(triviaSuccess.results[0].incorrect_answers[0]));
    expect(screen.getByTestId('header-score')).toHaveTextContent(0);
    expect(store.getState().trivia.answered).toBe(true);
  });
  test('Test next button', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(triviaSuccess),
    });

    renderWithRouterAndRedux(<App />, initialState, '/game');

    userEvent.click(await screen.findByTestId('correct-answer'));
    expect(screen.getByTestId('header-score')).toHaveTextContent(41);
    userEvent.click(await screen.findByTestId('btn-next'));

    expect(await screen.findByTestId('correct-answer'))
      .toHaveTextContent(triviaSuccess.results[1].correct_answer);
  });
  test('Timer', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(triviaSuccess),
    });
    renderWithRouterAndRedux(<App />, initialState, '/game');
    expect(await screen.findByTestId('question-category')).toBeDefined();
      await waitFor(() => expect(screen.getByText(/tempo restante: 0/ig)).toBeInTheDocument(), { timeout: 33000 });
  });
  test('Timer 2.0', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(triviaSuccess),
    });
    jest.spyOn(console, 'log');
    const { store } = renderWithRouterAndRedux(<App />, initialState, '/game');
    expect(await screen.findByTestId('question-category')).toBeDefined();
    userEvent.click(screen.getByTestId('correct-answer'));
    await waitFor(() => expect(screen.getByText(/tempo restante: 30/ig)).toBeInTheDocument(), { timeout: 33000 });
    expect(store.getState().trivia.answered).toBe(true);
    expect(await screen.findByTestId('btn-next')).toBeDefined();
    await waitFor(() => expect(console.log).toHaveBeenCalledWith('Else fela da...'), { timeout: 3000 });
  });
});
