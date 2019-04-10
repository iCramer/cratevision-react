import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './Icons.js';
import { MainApp } from './MainApp/MainApp';
import { Auth } from './Auth/Auth';

class App extends Component {

  render() {
    return (
      <Router>
        <Fragment>
          <Switch>
            <Route path="/auth" component={ Auth } />
            <Route path="/" component={ MainApp } />
          </Switch>
        </Fragment>
      </Router>
    );
  }
}

export default App;
