import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios'

import { Panel } from '../components/Panel';
import { Input } from '../components/Input';
import logo from '../assets/images/logo.png';

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
      [`${field}`]: evt.target.value
    });
  }

  submitForm = () => {
    let body = { username: this.state.email, password: this.state.password };

    axios.post('http://my.bundlevo.com/login', body).then(resp => {
      const token = resp.headers.authorization;
      localStorage.setItem('jwt', token);
      this.setState({loginSuccess: true});
    }, error => {
      console.log(error)
    });
  }

  render() {
    if(this.state.loginSuccess) {
      const from = this.props.location.state.from || '/dashboard';
      return <Redirect to={from} />
    }
    return (
      <Fragment>
        <h2>Login</h2>
        <Input label="Email" onChange={(evt) => this.setFormValues(evt, 'email')} />
        <Input type="password" label="Password" onChange={(evt) => this.setFormValues(evt, 'password')} />
        <button type="submit" className="btn btn-primary" onClick={this.submitForm}>Submit</button>
      </Fragment>
    )
  }
}
