import React, { Component, Fragment } from 'react';

import { Panel, Button, ListGroup, ListGroupItem, Badge, Input } from '../../components/core';
import { Table } from '../../components/Table';
import { Modal, ModalFooter, ModalBody } from '../../components/Modal';
import API from '../../services/api';

import { Doughnut } from 'react-chartjs-2';

export class ProductItems extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      product: {},
      productItems: [],
      displayProdItems: [],
      cost: 0,
      profit: 0,
      chartData: {},
      editItem: {},
      showModal: false
    }

    this.getProduct();
    this.getProductItems();
  }

  getProduct() {
    API.get('product/' + this.state.id).then(resp => {
      this.setState({
        product: resp.data,
        displayProdItems: resp.data.productItemQuantities
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
    const cost = (fees + prodItemsCost).toFixed(2);
    let profit = product.msrp - cost;
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
    })
  }

  getItemCount() {
    let count = 0;
    this.state.displayProdItems.forEach( item => {
      count += item.count;
    });
    return count;
  };

  changeCount = (item, add, countItem) => {
    let countObj;
    if (countItem) {
      countObj = { productItemQuantities: [countItem] };
    }
    else {
      countObj = { productItemQuantities: [{ count: 0, productItem: { id: item.id }}] };
    }
    let count = countObj.productItemQuantities[0].count;
    count = add ? count + 1 : count - 1;
    countObj.productItemQuantities[0].count = count;

    API.put(`product/${this.state.id}`, countObj).then(resp => {
      this.setState({
        product: resp.data,
        displayProdItems: resp.data.productItemQuantities
      });
      this.calculateCost();
    }).catch(error => {
      console.log(error.response)
    });
  }

  closeModal = () => {
    this.setState({ showModal: false });
  }

  render() {
    let productItemQty = this.state.displayProdItems;
    let prodItemCols = [
      {
        label: 'Count',
        render: obj => {
          let countItem = this.state.displayProdItems.find(item => item.productItem.id === obj.id);
          obj.count = countItem ? countItem.count : 0;

          return (
            <Fragment>
              <Button linkBtn btnStyle="danger" size="sm" icon="minus-circle" disabled={obj.count === 0} onClick={() => this.changeCount(obj, false, countItem)} />
              <Badge badgeStyle={obj.count > 0 ? 'info' : 'secondary'}>{obj.count}</Badge>
              <Button linkBtn btnStyle="success" size="sm" icon="plus-circle" onClick={() => this.changeCount(obj, true, countItem)} />
            </Fragment>
          )
        }
      },
      { label: 'Name', selector: 'name' },
      { label: 'Case Quantity', selector: 'caseQty' },
      { label: 'Case Cost', selector: 'caseCost' },
      { label: 'Item Cost', selector: 'itemCost' },
      { label: 'Supplier', selector: 'supplier.name' }
    ];

    const actions = [
      {
        icon: 'edit',
        clickHandler: obj => {
          this.setState({ showModal: true, editObj: obj});
        }
      }
    ];

    return (
      <Fragment>
          <div className="row">
            <div className="col-sm-8">
              <Panel accent="blue" title="Additional Product Items">
                <Table records={this.state.productItems} columns={prodItemCols} actions={actions} />
              </Panel>
            </div>
            <div className="col-sm-4">
            <div className="sticky">
              <Panel accent="pink" title="Cost Breakdown">
                <Doughnut data={this.state.chartData} legend={{position: 'left', labels: {boxWidth: 15, fontSize: 16, fontColor: '#444'}}} height={90} />
              </Panel>
              <Panel accent="blue" title="Included Product Items" utility={<Badge badgeStyle="success"><strong>{this.getItemCount()}</strong></Badge>}>
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

          <Modal title="Edit Product Item" open={this.state.showModal}>
            <ModalBody>
              <Input label="Name" value={this.state.editItem.name || ''} onChange={() => {}} />
            </ModalBody>
            <ModalFooter>
              <Button linkBtn onClick={this.closeModal}>Cancel</Button>
              <Button>Submit</Button>
            </ModalFooter>
          </Modal>
      </Fragment>
    )
  }
}
