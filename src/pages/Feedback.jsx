import { number, string, shape } from 'prop-types';
import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class Feedback extends Component {
  state = {
    email: '',
  };

  componentDidMount() {
    const { email, name, score } = this.props;
    const gravatar = `https://www.gravatar.com/avatar/${md5(email).toString()}`;
    const storage = JSON.parse(localStorage.getItem('ranking')) || [];
    const rankingInfo = [
      ...storage,
      { name, score, picture: gravatar },
    ];
    localStorage.setItem('ranking', JSON.stringify(rankingInfo));

    this.setState({
      email: md5(email).toString(),
    });
  }

  pageLogin = () => {
    const { history } = this.props;
    history.push('/');
  };

  pageRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { email } = this.state;
    const { name, score, feedback } = this.props;
    const MIN_SCORE = 3;
    console.log(score, feedback);
    return (
      <div>
        Feedback page
        <header>
          <img
            src={ `https://www.gravatar.com/avatar/${email}` }
            alt="foto do gravatar"
            data-testid="header-profile-picture"
          />
          <h4 data-testid="header-player-name">{name}</h4>
          <p
            data-testid="header-score"
          >
            {score}
          </p>
        </header>
        <section data-testid="feedback-text">
          {feedback < MIN_SCORE ? (
            <span>Could be better...</span>
          ) : (
            <span>Well Done!</span>
          )}
        </section>
        <section>
          <div>
            Você acertou
            {' '}
            <span data-testid="feedback-total-question">{feedback}</span>
            {' '}
            questões!
            <p>
              Um total de
              {' '}
              <span data-testid="feedback-total-score">{score}</span>
              {' '}
              pontos.
            </p>
          </div>
        </section>

        <section>
          <button
            data-testid="btn-play-again"
            type="button"
            onClick={ this.pageLogin }
          >
            Play Again
          </button>
          <button
            data-testid="btn-ranking"
            type="button"
            onClick={ this.pageRanking }
          >
            Ranking
          </button>
        </section>
      </div>
    );
  }
}

Feedback.propTypes = {
  email: string.isRequired,
  name: string.isRequired,
  score: number.isRequired,
  feedback: number.isRequired,
  history: shape().isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  name: state.user.name,
  score: state.player.score,
  feedback: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
