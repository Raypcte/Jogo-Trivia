import { number, string } from 'prop-types';
import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class Feedback extends Component {
  state = {
    email: '',
  };

  componentDidMount() {
    const { email } = this.props;
    this.setState({
      email: md5(email).toString(),
    });
  }

  render() {
    const { email } = this.state;
    const { name, score } = this.props;
    return (
      <div data-testid="feedback-text">
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
      </div>
    );
  }
}

Feedback.propTypes = {
  email: string.isRequired,
  name: string.isRequired,
  score: number.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  name: state.user.name,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
