import React, { Component, Fragment } from 'react';

import { Panel, Button, ListGroup, ListGroupItem, Badge } from '../../components/core';
import { Table } from '../../components/Table';
import API from '../../services/api';

import { Doughnut } from 'react-chartjs-2';

export class ProductItems extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: {},
      cost: 0,
      profit: 0,
      chartData: {},
    }

    this.getProduct();
  }

  getProduct() {
    API.get('product/' + this.props.productId).then(resp => {
      this.setState({ product: resp.data });
      this.calculateCost();
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
      { label: 'Name', selector: 'productItem.name' },
      { label: 'Quantity', selector: 'count' },
      { label: 'Case Quantity', selector: 'productItem.caseQty' },
      { label: 'Item Cost', selector: 'productItem.itemCost' },
      { label: 'Supplier', selector: 'productItem.supplier.name' },
      { label: 'Description', selector: 'productItem.description' }
    ];

    return (
      <Fragment>
          <div className="row full-height-cols">
            <div className="col">
              <Panel accent="blue" title="Product Items">
                <Table records={product.productItemQuantities} columns={productItemColumns} />
              </Panel>
            </div>
          </div>
      </Fragment>
    )
  }
}
