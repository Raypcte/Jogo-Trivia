import { shape, string } from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Game extends Component {
  state = {
    email: '',
    score: 0,
  };

  componentDidMount() {
    const { email } = this.props;
    this.setState({
      email: md5(email).toString(),
    });
  }

  handleClick = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { email, score } = this.state;
    const { name } = this.props;
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
