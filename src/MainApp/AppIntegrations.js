import React, { Component } from 'react';

import { TitleBar } from '../components/core';
import API from '../services/api';

export class AppIntegrations extends Component {
  componentDidMount() {
    this.getIntegrations();
  }

  getIntegrations() {
    API.get('apps/import/2').then(resp => {

    }).catch(error => {
      console.log(error.response)
    });
  }

  render() {
    return (
      <TitleBar title="App Integrations" />
    )
  }
}
