import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../trivia.png';
import '../App.css';
import validateEmail from '../helpers/validate';

class Login extends Component {
  state = {
    email: '',
    name: '',
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  render() {
    const { email, name } = this.state;
    return (
      <div className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <form>
          <label htmlFor="email">
            <input
              data-testid="input-player-name"
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
              data-testid="input-gravatar-email"
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
          >
            Play
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  email: user.email,
  name: user.name,
});

export default connect(mapStateToProps)(Login);
