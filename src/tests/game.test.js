import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe('Test the Game page', () => {
  const userInfo = {
    email: 'user@test.com',
    name: 'User',
  }
  const userInfoFalse = {
    email: 'usertest.com',
    name: 'User',
  }

  test('Test if the button redirects to the Settings page', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    userEvent.type(screen.getByTestId('input-gravatar-email'), userInfo.email);
    userEvent.type(screen.getByTestId('input-player-name'), userInfo.name);
    userEvent.click(screen.getByTestId('btn-play'));
    userEvent.click(screen.getByTestId('btn-settings'));
    expect(history.location.pathname).toBe('/settings');
  });
});
