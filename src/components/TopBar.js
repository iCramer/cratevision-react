import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button } from '../components/core';
import API from '../services/api';

export class TopBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      avatarOpen: false,
      isLoggedIn: true,
      userInfo: {},
      initials: ''
    };

    this.getUserInfo();
  }

  getUserInfo() {
    API.get('/user/').then( resp => {
      const user = resp.data;
      this.setState({
        userInfo: user,
        initials: user.firstName.charAt(0) + user.lastName.charAt(0)
      });
    }).catch( error => {
      console.log(error);
    });
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.onOutsideClick);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.onOutsideClick);
  }

  onOutsideClick = (evt) => {
    if(!this.node.contains(evt.target)) {
      this.setState({avatarOpen: false});
    }
  }

  getListClasses() {
    const classes = classnames(
      'avatar-dd',
      { 'open': this.state.avatarOpen }
    );

    return classes;
  }

  open = () => {
    this.setState({avatarOpen: true});
  }

  logOut = () => {
    this.setState({ isLoggedIn: false });
  }

  render() {
    if(!this.state.isLoggedIn) {
      localStorage.removeItem('jwt');
      return <Redirect to="/auth/login" />
    }

    return (
      <header id="top-bar">
        <div className="top-bar-accent"></div>
        <h4 id="top-bar-logo">{this.state.userInfo.org && this.state.userInfo.org.name}</h4>
        <div className="avatar">
          <button type="button" className="avatar-btn" onClick={this.open}>
            {this.state.initials}
          </button>
          <div className={this.getListClasses()} ref={node => this.node = node}>
            <div className="avatar-dd-header">
              <h5>{this.state.userInfo.firstName + ' ' + this.state.userInfo.lastName}</h5>
              <p>{this.state.userInfo.org && this.state.userInfo.org.name}</p>
            </div>
            <ul className="avatar-dd-body">
              <li>
                <Button btnStyle="primary" onClick={this.logOut} linkBtn icon="sign-out-alt">Log Out</Button>
              </li>
            </ul>
          </div>
        </div>
      </header>
    )
  }
}
