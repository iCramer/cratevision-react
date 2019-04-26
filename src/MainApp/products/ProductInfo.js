import React, { Component, Fragment } from 'react';

import { Panel, Button, ListGroup, ListGroupItem, Badge, NoResults } from '../../components/core';
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
      prodItemsCost += item.productItem.itemCost * item.count;
    });
    prodItemsCost = prodItemsCost.toFixed(2);
    const cost = fees + prodItemsCost;
    let profit = (product.msrp - cost).toFixed(2);
    if(profit < 0) {
      profit = 0;
    }
    this.setState({
      chartData: {
        labels: [`MSRP - ${product.msrp}`, `Fees - ${fees}`, `Product Cost - ${prodItemsCost}`, `Profit - ${profit}`],
        datasets: [{
          data: [product.msrp, fees, prodItemsCost, profit],
          backgroundColor: ['#ff6384', '#ffcd56', '#36a2eb', '#00ad10']
        }]
      }
    });
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
          <div className="row">
            <div className="col">
              <Panel accent="blue" title="Summary">
                {product.images &&
                  <img className="product-img" src={product.images[0].path} alt={product.images[0].name} />
                }
                <ListGroup iconList>
                  <ListGroupItem justifyContent icon="address-card">
                    Name <span>{product.name}</span>
                  </ListGroupItem>
                  <ListGroupItem justifyContent icon="tag">
                    MSRP <span>{product.msrp}</span>
                  </ListGroupItem>
                  <ListGroupItem justifyContent icon="ellipsis-h">
                    Status <Badge badgeType="blip" badgeStyle={statusStyle}>{product.status && product.status.name}</Badge>
                  </ListGroupItem>
                </ListGroup>
              </Panel>
            </div>
            <div className="col">
              <Panel accent="yellow" title="Fees">
                { product.fees && !product.fees.length &&
                  <NoResults header="No Fees Assigned" icon="hand-holding-usd" action={() => console.log('click')} btnLabel="Add Fee" />
                }
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
                <Doughnut data={this.state.chartData} legend={{position: 'left', labels: {boxWidth: 15, fontSize: 16, fontColor: '#444'}}} height={90} />
              </Panel>
            </div>
          </div>
      </Fragment>
    )
  }
}
