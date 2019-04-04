import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../assets/images/bundlevoLogo(primaries).svg';

export class SideNav extends Component {

  render() {
    return (
      <nav id="side-nav">
        <ul className="flex-column">
          <li>
            <NavLink activeClassName="active" to="/dashboard">
              <FontAwesomeIcon icon="tachometer-alt" />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/products">
              <FontAwesomeIcon icon="box-open" />
              <span>Products</span>
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/product-orders">
              <FontAwesomeIcon icon="shipping-fast" />
              <span>Product Orders</span>
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/product-items">
              <FontAwesomeIcon icon="cubes" />
              <span>Apps</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    )
  }
}
