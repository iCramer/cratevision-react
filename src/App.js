import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './App.scss';
import { SideNav } from './components/SideNav';
import { TopBar } from './components/TopBar';
import { Dashboard } from './pages/Dashboard';
import { Products } from './pages/Products';
import { ProductItems } from './pages/ProductItems';
import { Orders } from './pages/Orders';

//Font Awesome Icons
import {
  faTachometerAlt,
  faBarcode,
  faBoxOpen,
  faBox,
  faShippingFast,
  faAnchor
} from '@fortawesome/free-solid-svg-icons';
library.add(
  faTachometerAlt,
  faBarcode,
  faBoxOpen,
  faBox,
  faShippingFast,
  faAnchor
);

class App extends Component {
  render() {
    return (
      <Router>
        <div className="d-flex flex-row">
          <SideNav />
          <div className="flex-fill">
            <TopBar />
            <main>
              <Route path="/dashboard" component={ Dashboard } />
              <Route path="/products" component={ Products } />
              <Route path="/product-items" component={ ProductItems } />
              <Route path="/orders" component={ Orders } />
            </main>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
