import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

const local = [
  {
    name: 'Naruto',
    score: 41,
    picture: 'https://www.gravatar.com/avatar/783159f434f6ea5908fafa751f044684',
  },
  {
    name: 'Goku',
    score: 44,
    picture: 'https://www.gravatar.com/avatar/783159f434f6ea5908fafa751f044684',
  },
];

describe('teste tela ranking', () => {
  it('Testes da tela de ranking', () => {
    localStorage.setItem('ranking', JSON.stringify(local));
    const { history } = renderWithRouterAndRedux(<App />, {}, '/ranking');
    // history.push('/ranking');
    console.log(history);

    const ranking = screen.getByRole('heading', { name: /ranking/i });
    expect(ranking).toBeInTheDocument();

    const participante = screen.getByText(/naruto/i);
    expect(participante).toBeInTheDocument();

    const pontos = screen.getByText(/41/i);
    expect(pontos).toBeInTheDocument();

    const botao = screen.getByRole('button', { name: /tela inicial/i });
    expect(botao).toBeInTheDocument();

    userEvent.click(botao);
    expect(history.location.pathname).toBe('/');
  });
});
