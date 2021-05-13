import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Main from '../Main/Main';
import styles from './App.style';

class App extends Component {
  render() {
    return (
      <Router>
        <div style={styles.appContainer}>
          <Switch>
            <Route path="/" component={Main} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
