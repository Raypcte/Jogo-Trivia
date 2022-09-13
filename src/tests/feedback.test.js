import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Test Feedback component', () => {
  it('Should redirect to the home page', () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, '/feedback');

    userEvent.click(screen.getByTestId('btn-play-again'));
    expect(history.location.pathname).toBe('/');
  });
  it('Should redirect to the Ranking page', () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, '/feedback');

    userEvent.click(screen.getByTestId('btn-ranking'));
    expect(history.location.pathname).toBe('/ranking');
  });
});
