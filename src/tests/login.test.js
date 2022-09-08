import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import App from '../App';
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe('Test the Login page', () => {
  const userInfo = {
    email: 'user@test.com',
    name: 'User',
  }
  const userInfoFalse = {
    email: 'usertest.com',
    name: 'User',
  }

  test('Test if the button is disabled while the inputs are blank', () => {
    renderWithRouterAndRedux(<App />);

    expect(screen.getByTestId('btn-play')).toBeDefined();
    expect(screen.getByTestId('btn-play')).toBeDisabled();
    userEvent.type(screen.getByTestId('input-gravatar-email'), userInfoFalse.email);
    expect(screen.getByTestId('btn-play')).toBeDisabled();
    userEvent.type(screen.getByTestId('input-gravatar-email'), userInfo.email);
    userEvent.type(screen.getByTestId('input-player-name'), userInfo.name);
    expect(screen.getByTestId('btn-play')).toBeEnabled();
  });
  test('Test if the button redirects to the Game page', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    userEvent.type(screen.getByTestId('input-gravatar-email'), userInfo.email);
    userEvent.type(screen.getByTestId('input-player-name'), userInfo.name);
    userEvent.click(screen.getByTestId('btn-play'));
    expect(history.location.pathname).toBe('/game');
  });
  test('Test if the button redirects to the Settings page', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    userEvent.click(screen.getByTestId('btn-settings'));
    expect(history.location.pathname).toBe('/settings');
  });
});
