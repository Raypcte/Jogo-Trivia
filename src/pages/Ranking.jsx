import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Ranking extends Component {
  state = {
    jogadores: [],
  };

  componentDidMount() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    console.log(ranking);
    this.setState(
      {
        jogadores: [...ranking]
          .sort((a, b) => b.score - a.score)
        ,
      },
    );
  }

  rota = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { jogadores } = this.state;

    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        {jogadores.map((item, index) => (
          <div key={ index }>
            <p data-testid={ `player-name-${index}` }>{item.name}</p>
            <p data-testid={ `player-score-${index}` }>{item.score}</p>
            <img src={ item.picture } alt="imagem" />
          </div>
        ))}
        <button data-testid="btn-go-home" type="button" onClick={ this.rota }>
          tela inicial
        </button>
      </div>
    );
  }
}
Ranking.propTypes = {
  history: propTypes.shape({
    push: propTypes.func,
  }).isRequired,
};

export default connect()(Ranking);
