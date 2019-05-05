import React, { Component, Fragment } from 'react';
import { Doughnut } from 'react-chartjs-2';

import { Panel, Button, ListGroup, ListGroupItem, Badge, Input, CounterInput } from '../../components/core';
import { Table } from '../../components/Table';
import { ProductItemPanel } from './ProductItemPanel';
import API from '../../services/api';

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
      selectedItem: {},
      showDetails: false,
      saveDisabled: true
    }

    this.getProduct();
    this.getProductItems();
  }

  getProduct() {
    API.get('product/' + this.state.id).then(resp => {
      this.setState({
        product: resp.data
      });
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

  changeCount = (item, evt, countItem) => {
    let prodItemQty = this.state.product.productItemQuantities;
    let count = evt.target.value !== '' ? parseInt(evt.target.value) : '';
    if (countItem) {
      if (count === 0) {
        let index = prodItemQty.findIndex(obj => obj.productItem.id === item.id);
        prodItemQty.splice(index, 1);
      }
      else {
        countItem.count = count;
      }
    }
    else {
      prodItemQty.push({ count: count, productItem: item });
    }
    this.calculateCost();
    this.setState({ saveDisabled: false });
  }

  handleCountBlur = (item, evt, countItem) => {
    if(evt.target.value === '') {
      evt.target.value = 0;
      this.changeCount(item, evt, countItem);
    }
  }

  openDetails = (obj) => {
    this.setState({ showDetails: true, selectedItem: obj });
  }

  closeDetails = () => {
    this.setState({ showDetails: false, selectedItem: {} });
  }

  save = () => {
    API.put(`product/${this.state.id}`, this.state.product).then(resp => {
      this.setState({ product: resp.data });
      this.calculateCost();
    }).catch(error => {
      console.log(error.response)
    });
  }

  render() {
    let productItemQty = this.state.product.productItemQuantities || [];
    let prodItemCols = [
      {
        label: 'Count',
        render: obj => {
          let countItem = productItemQty.find(item => item.productItem.id === obj.id);
          obj.count = countItem ? countItem.count : 0;

          return (
            <CounterInput value={obj.count} onBlur={(evt) => this.handleCountBlur(obj, evt, countItem)} onChange={(evt) => this.changeCount(obj, evt, countItem)} />
          )
        }
      },
      { label: 'Name',
        render: obj => {
          return <Button size="xs" linkBtn onClick={() => this.openDetails(obj)}>{obj.name}</Button>
        }
      },
      { label: 'Case Quantity', selector: 'caseQty' },
      { label: 'Case Cost', selector: 'caseCost' },
      { label: 'Item Cost', selector: 'itemCost' },
      { label: 'Supplier', selector: 'supplier.name' }
    ];

    return (
      <Fragment>
          <div className="row">
            <div className="col-sm-8">
              <Panel title="Additional Product Items" utility={<Button onClick={this.save} disabled={this.state.saveDisabled}>Save</Button>}>
                <Table records={this.state.productItems} columns={prodItemCols} />
              </Panel>
            </div>
            <div className="col-sm-4">
            <div className="sticky">
              <Panel title="Cost Breakdown">
                <Doughnut data={this.state.chartData} legend={{position: 'left', labels: {boxWidth: 15, fontSize: 16, fontColor: '#444'}}} height={90} />
              </Panel>
              <Panel title="Included Product Items">
                <ListGroup>
                { productItemQty && productItemQty.map( (item, index) => {
                  return (
                    <ListGroupItem key={index} justifyContent>
                      {item.productItem.name} <Badge badgeStyle="info">{item.count}</Badge>
                    </ListGroupItem>
                  )
                })}
                </ListGroup>
              </Panel>
              </div>
            </div>
          </div>

          <ProductItemPanel key={this.state.selectedItem.id} open={this.state.showDetails} closePanel={this.closeDetails} item={this.state.selectedItem} />
      </Fragment>
    )
  }
}
