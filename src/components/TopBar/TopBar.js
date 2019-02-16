import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './TopBar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class TopBar extends Component {

  render() {
    return (
      <div id="top-bar">
        <div className="avatar">
          IC
        </div>
      </div>
    )
  }
}
