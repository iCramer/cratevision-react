import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';

import { Panel, Input, Button } from '../components/core';
import logo from '../assets/images/logo.png';
import API from '../services/api';

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      loginSuccess: false
    };
  }

  setFormValues = (evt, field) => {
    this.setState({
      [field]: evt.target.value
    });
  }

  submitForm = () => {
    const body = { username: this.state.email, password: this.state.password };

    API.post('login', body).then(resp => {
      const token = resp.headers.authorization;
      localStorage.setItem('jwt', token);
      this.setState({loginSuccess: true});
    }).catch( error => {
      console.log(error)
    });
  }

  render() {
    if(this.state.loginSuccess) {
      let from = '';
      if(this.props.location.state && this.props.location.state.from) {
        from = this.props.location.state.from;
      }
      else {
        from = '/dashboard';
      }
      return <Redirect to={from} push />
    }
    return (
      <Fragment>
        <h2>Login</h2>
        <Input label="Email" onChange={(evt) => this.setFormValues(evt, 'email')} />
        <Input type="password" label="Password" onChange={(evt) => this.setFormValues(evt, 'password')} />
        <Button type="submit" btnStyle="primary" onClick={this.submitForm} centered>Submit</Button>
      </Fragment>
    )
  }
}
