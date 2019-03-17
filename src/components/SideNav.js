import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../assets/images/whiteLogo.png';

export class SideNav extends Component {

  render() {
    return (
      <nav id="side-nav">
        <div className="nav-overlay"></div>
        <div id="logo">
          <img src={logo} />
        </div>
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
            <NavLink activeClassName="active" to="/product-items">
              <FontAwesomeIcon icon="barcode" />
              <span>Apps</span>
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/orders">
              <FontAwesomeIcon icon="shipping-fast" />
              <span>Orders</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    )
  }
}
