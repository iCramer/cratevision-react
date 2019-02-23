import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class TopBar extends Component {

  render() {
    return (
      <div id="top-bar">
        <div className="top-bar-accent"></div>
        <h4 id="top-bar-logo">MyCollegeCrate</h4>
        <div className="avatar">
          IC
        </div>
      </div>
    )
  }
}
