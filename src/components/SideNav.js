import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../assets/images/cube.png';

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
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/products">
              <FontAwesomeIcon icon="box-full" />
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/product-orders">
              <FontAwesomeIcon icon="shipping-fast" />
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/app-integrations">
              <FontAwesomeIcon icon="cubes" />
            </NavLink>
          </li>
        </ul>
      </nav>
    )
  }
}
