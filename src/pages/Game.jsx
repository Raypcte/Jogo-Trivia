import { shape, string, func, number } from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import fetchPlayerToken, { fetchTriviaQuestions } from '../helpers/api';
import Timer from '../components/Timer';
import { fetchScore, questionAnswered } from '../redux/actions';
import calculatePoints from '../helpers/pointsScored';

class Game extends Component {
  state = {
    email: '',
    score: 0,
    data: [],
    count: 0,
    answered: false,
  };

  async componentDidMount() {
    const { email, history } = this.props;

    const token = await fetchPlayerToken();
    const data = await fetchTriviaQuestions(token);
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

  handleClickAnswer = (answer) => {
    const { data, count } = this.state;
    const { dispatch, timer } = this.props;
    const POINTS = 10;
    console.log(calculatePoints(data[count].difficulty));
    this.setState({ answered: true });
    if (answer === data[count].correct_answer) {
      this.setState((prev) => ({ score: prev.score + (POINTS + (timer
        + calculatePoints(data[count].difficulty)
      )) }), () => {
        const { score } = this.state;
        dispatch(fetchScore(score));
      });
      dispatch(questionAnswered(true));
      console.log('acertou');
      return true;
    }
    console.log('errou');
    dispatch(questionAnswered(true));
    return false;
  };

  handleNext = () => {
    const { dispatch } = this.props;
    const MAX_COUNT = 4;
    this.setState((prev) => ({ count: prev.count <= MAX_COUNT
      ? prev.count + 1 : prev.count }));
    this.setState({ answered: false });
    dispatch(questionAnswered(false));
  };

  render() {
    const { email, score, data, count, answered } = this.state;
    const { name, timer } = this.props;
    const findResults = data.find((_, index) => index === count);
    let arrayAnswer;
    if (findResults) {
      arrayAnswer = [...findResults.incorrect_answers, findResults.correct_answer];
      const NUMBER = 0.5;
      arrayAnswer = arrayAnswer.sort(() => Math.random() - NUMBER);
    }
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
                      key={ answer }
                      data-testid="correct-answer"
                      type="button"
                      onClick={ () => this.handleClickAnswer(answer) }
                      style={ {
                        border: answered && '3px solid rgb(6, 240, 15)',
                      } }
                      disabled={ timer === 0 || answered }
                    >
                      {answer}
                    </button>
                  ) : (
                    <button
                      key={ answer }
                      data-testid={ `wrong-answer-${count}` }
                      type="button"
                      onClick={ () => this.handleClickAnswer(answer) }
                      style={ {
                        border: answered && '3px solid red',
                      } }
                      disabled={ timer === 0 || answered }
                    >
                      {answer}
                    </button>
                  );
                })}
              </section>
              <Timer />
              {answered && (
                <button
                  data-testid="btn-next"
                  type="button"
                  onClick={ this.handleNext }
                >
                  Next
                </button>
              )}
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
  dispatch: func.isRequired,
  timer: number.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  name: state.user.name,
  timer: state.trivia.timer,
});

export default connect(mapStateToProps)(Game);
