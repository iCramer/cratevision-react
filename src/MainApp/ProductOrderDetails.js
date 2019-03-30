import React, { Component, Fragment } from 'react';

import { TitleBar } from '../components/TitleBar';
import { Panel } from '../components/Panel';
import { Table } from '../components/Table';
import API from '../services/api';

export class ProductOrderDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      order: {}
    }

    this.getOrder();
  }

  getOrder() {
    API.get('productorder/' + this.state.id).then(resp => {
      this.setState({ order: resp.data });
    }).catch(error => {
      console.log(error.response)
    });
  }

  render() {
    let order = this.state.order;
    return (
      <Fragment>
        <TitleBar title="Product Order Details" />
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6">
              <Panel>
                <h1>Order {this.state.id}</h1>
              </Panel>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}
