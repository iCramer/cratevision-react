import React, { Component, Fragment } from 'react';

import { Panel, Button, ListGroup, ListGroupItem, Badge } from '../../components/core';
import API from '../../services/api';

import { Doughnut } from 'react-chartjs-2';

export class ProductInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      product: {},
      cost: 0,
      profit: 0,
      chartData: {},
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

    const statusStyle = product.status && product.status.name === 'Active' ? 'success' : 'danger';

    return (
      <Fragment>
          <div className="row full-height-cols">
            <div className="col">
              <Panel accent="blue" title="Summary">
                <ListGroup iconList>
                  <ListGroupItem justifyContent icon="address-card">
                    Name <span>{product.name}</span>
                  </ListGroupItem>
                  <ListGroupItem justifyContent icon="tag">
                    MSRP <span>{product.msrp}</span>
                  </ListGroupItem>
                  <ListGroupItem justifyContent icon="hand-holding-usd">
                    Cost <span>{this.state.cost}</span>
                  </ListGroupItem>
                  <ListGroupItem justifyContent icon="money-bill-alt">
                    Profit <span>{this.state.profit}</span>
                  </ListGroupItem>
                  <ListGroupItem justifyContent icon="ellipsis-h">
                    Status <Badge badgeType="blip" badgeStyle={statusStyle}>{product.status && product.status.name}</Badge>
                  </ListGroupItem>
                </ListGroup>
              </Panel>
            </div>
            <div className="col">
              <Panel accent="yellow" title="Fees">
                <ListGroup iconList>
                {product.fees && product.fees.map( (fee, index) => {
                  return (
                    <ListGroupItem key={index} icon="receipt" color="yellow" justifyContent>
                      {fee.name} <span>{fee.price}</span>
                    </ListGroupItem>
                  )
                })}
                </ListGroup>
              </Panel>
            </div>
            <div className="col">
              <Panel accent="pink" title="Cost Breakdown">
                <Doughnut data={this.state.chartData} height={200} />
              </Panel>
            </div>
          </div>
      </Fragment>
    )
  }
}
