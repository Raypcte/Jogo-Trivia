import { shape, string } from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import fetchPlayerToken from '../helpers/api';

class Game extends Component {
  state = {
    email: '',
    score: 0,
    data: [],
    count: 0,
  };

  async componentDidMount() {
    const { email, history } = this.props;

    const token = await fetchPlayerToken();
    const endpoint = `https://opentdb.com/api.php?amount=5&token=${token.token}`;
    const response = await fetch(endpoint);
    const data = await response.json();
    const ERROR_CODE = 3;
    if (data.response_code === ERROR_CODE || token.response_code === ERROR_CODE) {
      history.push('/');
    }
    this.setState({
      email: md5(email).toString(),
      data: data.results,
    });
  }

  handleClick = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { email, score, data, count } = this.state;
    const { name } = this.props;
    const findResults = data.find((_, index) => index === count);
    let arrayAnswer;
    if (findResults) {
      arrayAnswer = [...findResults.incorrect_answers, findResults.correct_answer];
      const NUMBER = 0.5;
      arrayAnswer = arrayAnswer.sort(() => Math.random() - NUMBER);
    }

    console.log(arrayAnswer);
    console.log(findResults);
    return (
      <div>
        Game page
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
        <section>
          <button
            data-testid="btn-settings"
            type="button"
            onClick={ this.handleClick }
          >
            settings
          </button>
        </section>
        {findResults
          && (
            <section>
              <h2 data-testid="question-category">
                {findResults.category}
              </h2>
              <h3 data-testid="question-text">
                {findResults.question}
              </h3>
              <section data-testid="answer-options">
                {arrayAnswer.map((answer, index) => {
                  const currentIndex = arrayAnswer.indexOf(findResults.correct_answer);
                  return index === currentIndex ? (
                    <button
                      type="button"
                      data-testid="correct-answer"
                      key={ answer }
                    >
                      {answer}
                    </button>
                  ) : (
                    <button
                      type="button"
                      key={ answer }
                      data-testid={ `wrong-answer-${count}` }
                    >
                      {answer}
                    </button>
                  );
                })}
              </section>
            </section>
          )}
      </div>
    );
  }
}

Game.propTypes = {
  history: shape().isRequired,
  email: string.isRequired,
  name: string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  name: state.user.name,
});

export default connect(mapStateToProps)(Game);
