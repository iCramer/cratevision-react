import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Panel } from '../components/Panel';
import logo from '../assets/images/logo.png';
import { Login } from './Login';


export class Auth extends Component {

  render() {
    return (
        <div id="login">
          <Panel>
            <img src={logo} />
            <Route exact path="/auth/login" component={ Login } />
          </Panel>
        </div>
    )
  }
}
