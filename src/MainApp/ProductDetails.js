import React, { Component, Fragment } from 'react';

import { TitleBar } from '../components/TitleBar';
import { Panel } from '../components/Panel';
import { Table } from '../components/Table';
import API from '../services/api';

export class ProductDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      product: {},
      cost: 0,
      profit: 0
    }

    this.getProduct();
  }

  getProduct() {
    API.get('product/' + this.state.id).then(resp => {
      this.setState({ product: resp.data });
      this.calculateCost();
    }).catch(error => {
      console.log(error.response)
    });
  }

  calculateCost() {
    let fees = 0;
    this.state.product.fees.forEach( fee => {
      fees += fee.price;
    });

    let prodItemsCost = 0;
    this.state.product.productItemQuantities.forEach( item => {
      prodItemsCost += item.productItem.itemCost;
    });
    const cost = (fees + prodItemsCost).toFixed(2);
    const profit = this.state.product.msrp - cost;
    this.setState({ cost: cost, profit: profit });
  }

  render() {
    let product = this.state.product;
    return (
      <Fragment>
        <TitleBar title="Product Details">
          <div className="calc-group">
            <span className="h2">{product.msrp}</span>
            <span className="badge badge-pill badge-info">MSRP</span>
          </div>
          <div className="calc-group">
            <span className="h2">{this.state.cost}</span>
            <span className="badge badge-pill badge-danger">Cost</span>
          </div>
          <div className="calc-group">
            <span className="h2">{this.state.profit}</span>
            <span className="badge badge-pill badge-success">Profit</span>
          </div>
        </TitleBar>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6">
              <Panel>
                <h1>Product {this.state.id}</h1>
              </Panel>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}
