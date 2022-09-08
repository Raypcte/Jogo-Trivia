import React, { Component } from 'react';
import { connect } from 'react-redux';

class Settings extends Component {
  render() {
    return (
      <div>
        <h1 data-testid="settings-title">Configurações</h1>
      </div>
    );
  }
}

export default connect()(Settings);
