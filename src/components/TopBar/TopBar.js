import React, { Component } from 'react';
import './TopBar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class TopBar extends Component {

  render() {
    return (
      <div id="top-bar">
        <div className="top-bar-accent"></div>
        <div className="avatar">
          IC
        </div>
      </div>
    )
  }
}
