import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Main from '../Main/Main';
import Post from '../Post/Post';
import styles from './App.style';

class App extends Component {
  render() {
    return (
      <Router>
        <div style={styles.appContainer}>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/post" component={Post} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
