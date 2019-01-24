import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import Routes from '../router';
import history from '../common/history';

import './index.css';

class App extends Component {
  render() {
    return (
      <Router history={history}>
        {Routes}
      </Router>
    );
  }
}

export default App;
