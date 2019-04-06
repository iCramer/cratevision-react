import React, { Component } from 'react';

import { TitleBar } from '../components/core';

export class EditProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      product: {}
    }
  }

  render() {
    return (
      <TitleBar title="Edit Product" />
    )
  }
}
