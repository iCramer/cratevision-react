import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { PrivateRoute } from '../components/PrivateRoute';

import { SideNav } from '../components/SideNav';
import { TopBar } from '../components/TopBar';
import { Dashboard } from './Dashboard';
import { Products } from './Products';
import { Orders } from './Orders';

export class MainApp extends Component {
  render() {
    return (
        <div className="d-flex flex-row">
          <SideNav />
          <div className="flex-fill">
            <TopBar />
            <main>
              <Switch>
                <PrivateRoute exact path="/dashboard" component={ Dashboard } />
                <PrivateRoute exact path="/products" component={ Products } />
                <PrivateRoute exact path="/orders" component={ Orders } />
                <PrivateRoute exact path="/">
                  <Redirect to="/dashboard" />
                </PrivateRoute>
              </Switch>
            </main>
          </div>
        </div>
    );
  }
}
