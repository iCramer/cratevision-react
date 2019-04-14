import React, { Component, Fragment } from 'react';

import { Panel, Button, ListGroup, ListGroupItem, Badge } from '../../components/core';
import { Table } from '../../components/Table';
import API from '../../services/api';

import { Doughnut } from 'react-chartjs-2';

export class ProductItems extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      product: {},
      productItems: [],
      cost: 0,
      profit: 0,
      chartData: {},
    }

    this.getProduct();
    this.getProductItems();
  }

  getProduct() {
    API.get('product/' + this.state.id).then(resp => {
      this.setState({ product: resp.data });
      this.calculateCost();
    }).catch(error => {
      console.log(error.response)
    });
  }

  getProductItems() {
    API.get('productitem/all').then(resp => {
      this.setState({ productItems: resp.data });
    }).catch(error => {
      console.log(error.response)
    });
  }

  calculateCost() {
    let product = this.state.product;
    let fees = 0;
    product.fees.forEach( fee => {
      fees += fee.price;
    });

    let prodItemsCost = 0;
    product.productItemQuantities.forEach( item => {
      prodItemsCost += item.productItem.itemCost;
    });
    const cost = (fees + prodItemsCost).toFixed(2);
    const profit = product.msrp - cost;

    this.setState({
      chartData: {
        labels: ['MSRP', 'Fees', 'Product Cost', 'Profit'],
        datasets: [{
          data: [product.msrp, fees, prodItemsCost, profit],
          backgroundColor: [
          '#ff6384',
          '#ffcd56',
          '#36a2eb',
          '#00ad10'
          ]
        }]
      }
    })
  }

  render() {
    let product = this.state.product;
    let productItemColumns = [
      { label: 'Name', selector: 'name' },
      { label: 'Case Quantity', selector: 'caseQty' },
      { label: 'Case Cost', selector: 'caseCost' },
      { label: 'Item Cost', selector: 'itemCost' },
      { label: 'Supplier', selector: 'supplier.name' },
      { label: 'Description', selector: 'description' }
    ];

    return (
      <Fragment>
          <div className="row">
            <div className="col-sm-8">
              <Panel accent="blue" title="Product Items">
                <Table records={this.state.productItems} columns={productItemColumns} />
              </Panel>
            </div>
            <div className="col-sm-4">
            <Panel accent="blue" title="Cost Breakdown" sticky>
              <Doughnut data={this.state.chartData} height={200} />
            </Panel>
            </div>
          </div>
      </Fragment>
    )
  }
}
