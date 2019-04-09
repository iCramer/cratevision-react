import React, { Component, Fragment } from 'react';

import { TitleBar, Panel, Input} from '../components/core';
import { Table } from '../components/Table';
import API from '../services/api';

import { Doughnut } from 'react-chartjs-2';

export class EditProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      product: {},
      displayProduct: {},
      chartData: {}
    }

    this.getProduct();
  }

  getProduct() {
    API.get('product/' + this.state.id).then(resp => {
      this.setState({ product: resp.data, displayProduct: resp.data });
      this.calculateCost();
    }).catch(error => {
      console.log(error.response)
    });
  }

  calculateCost = () => {
    let product = this.state.displayProduct;
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

  updateProduct = (evt, field) => {
    let product = this.state.displayProduct;
    product[field] = evt.target.value;
    this.setState({
      displayProduct: product
    });
    this.calculateCost();
  }

  render() {
    let product = this.state.displayProduct;

    return (
      <Fragment>
        <TitleBar title="Edit Product" />
        <div className="container-fluid">
          <div className="row full-height-cols">
            <div className="col-sm-8">
              <Panel accent="blue">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col">
                      <Input label="Name" value={product.name} onChange={(evt) => this.updateProduct(evt, 'name')} />
                      <Input label="MSRP" value={product.msrp} onChange={(evt) => this.updateProduct(evt, 'msrp')} />
                      <Input label="Stock" value={product.stock} onChange={(evt) => this.updateProduct(evt, 'stock')} />
                    </div>
                    <div className="col">
                    </div>
                  </div>
                </div>
              </Panel>
            </div>
            <div className="col-sm-4">
              <Panel accent="pink">
                <Doughnut data={this.state.chartData} height={250} />
              </Panel>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}
