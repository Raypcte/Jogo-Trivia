import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, shape } from 'prop-types';
import logo from '../trivia.png';
import '../App.css';
import validateEmail from '../helpers/validate';
import userInfoThunk, { fetchScore } from '../redux/actions';

class Login extends Component {
  state = {
    email: '',
    name: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchScore(0));
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleClick = () => {
    const { dispatch, history } = this.props;
    const { email, name } = this.state;
    history.push('/game');
    dispatch(userInfoThunk(email, name));
  };

  handleClickSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { email, name } = this.state;
    return (
      <div className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <form>
          <label htmlFor="email">
            <input
              data-testid="input-gravatar-email"
              type="email"
              name="email"
              id="email"
              placeholder="digite seu email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="name">
            <input
              data-testid="input-player-name"
              type="text"
              name="name"
              id="name"
              placeholder="digite seu nome"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>
          <button
            data-testid="btn-play"
            type="button"
            disabled={ validateEmail(email) || !name }
            onClick={ this.handleClick }
          >
            Play
          </button>
        </form>
        <button
          data-testid="btn-settings"
          type="button"
          onClick={ this.handleClickSettings }
        >
          settings
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  email: user.email,
  name: user.name,
});

Login.propTypes = {
  history: shape({}).isRequired,
  dispatch: func.isRequired,
};

export default connect(mapStateToProps)(Login);
