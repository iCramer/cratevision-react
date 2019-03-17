import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

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
                <Route exact path="/dashboard" component={ Dashboard } />
                <Route exact path="/products" component={ Products } />
                <Route exact path="/orders" component={ Orders } />
                <Route exact path="/">
                  <Redirect to="/dashboard" />
                </Route>
              </Switch>
            </main>
          </div>
        </div>
    );
  }
}
