import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { PrivateRoute } from '../components/PrivateRoute';

import { SideNav } from '../components/SideNav';
import { TopBar } from '../components/TopBar';
import { Dashboard } from './Dashboard';
import { Products } from './Products';
import { ProductDetails } from './ProductDetails';
import { ProductOrders } from './ProductOrders';
import { ProductOrderDetails } from './ProductOrderDetails';

export class MainApp extends Component {
  render() {
    return (
          <div className="flex-fill">
            <TopBar />
            <div class="d-flex flex-row">
              <SideNav />
              <main>
                <Switch>
                  <PrivateRoute exact path="/dashboard" component={ Dashboard } />
                  <PrivateRoute exact path="/products" component={ Products } />
                  <PrivateRoute exact path="/products/:id" component={ ProductDetails } />
                  <PrivateRoute exact path="/product-orders" component={ ProductOrders } />
                  <PrivateRoute exact path="/product-orders/:id" component={ ProductOrderDetails } />
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
