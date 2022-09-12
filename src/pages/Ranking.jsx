import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Ranking extends Component {
  rota = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
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
