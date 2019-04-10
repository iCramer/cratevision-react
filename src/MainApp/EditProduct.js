import React, { Component, Fragment } from 'react';

import { TitleBar, Panel, Input, Button } from '../components/core';
import { Table } from '../components/Table';
import { Modal, ModalBody, ModalFooter } from '../components/Modal';
import API from '../services/api';

import { Doughnut } from 'react-chartjs-2';

export class EditProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      product: {},
      displayProduct: {},
      chartData: {},
      showEditFeeModal: false,
      editFee: {}
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

  updateFee = (evt, field) => {
    let fee = this.state.editFee;
    fee[field] = evt.target.value;
    this.setState({
      editFee: fee
    });
  }

  saveEdits = () => {
    API.put('product/' + this.state.id, this.state.displayProduct).then(resp => {
      console.log(resp)
    }).catch(error => {
      console.log(error.response)
    });
  }

  saveFeeEdits = () => {
    API.put('fee/' + this.state.editFee.id, this.state.editFee).then(resp => {
      this.closeFeeModal();
    }).catch(error => {
      console.log(error.response)
    });
  }

  closeFeeModal = () => {
    this.setState({showEditFeeModal: false});
  }

  render() {
    let product = this.state.displayProduct;
    const feesColumns = [
      { label: 'Name', selector: 'name' },
      { label: 'Cost', selector: 'price' }
    ];
    const feesActions = [
      { label: 'Edit',
        icon: 'edit',
        clickHandler: obj => {
          this.setState({showEditFeeModal: true, editFee: obj});
        }
      }
    ];

    return (
      <Fragment>
        <TitleBar title="Edit Product">
          <Button onClick={this.saveEdits}>Save</Button>
        </TitleBar>
        <div className="container-fluid">
          <div className="row full-height-cols">
            <div className="col">
              <Panel accent="blue" title="Product Information">
                <Input label="Name" value={product.name || ''} onChange={(evt) => this.updateProduct(evt, 'name')} />
                <Input label="MSRP" value={product.msrp || ''} onChange={(evt) => this.updateProduct(evt, 'msrp')} />
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="checkbox" id="active" value="active" />
                  <label className="form-check-label" htmlFor="active">Active</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="checkbox" id="prototype" value="prototype" />
                  <label className="form-check-label" htmlFor="prototype">Prototype</label>
                </div>
              </Panel>
            </div>
            <div className="col">
              <Panel accent="yellow" title="Fees">
                <Table columns={feesColumns} records={product.fees} actions={feesActions} />
              </Panel>
            </div>
            <div className="col">
              <Panel accent="pink" title="Cost Breakdown">
                <Doughnut data={this.state.chartData} height={250} />
              </Panel>
            </div>
          </div>
        </div>
        <Modal title="Edit Fee" open={this.state.showEditFeeModal}>
          <ModalBody>
            <Input label="Name" value={this.state.editFee.name || ''} onChange={(evt) => this.updateFee(evt, 'name')} />
            <Input label="Cost" value={this.state.editFee.price || ''} onChange={(evt) => this.updateFee(evt, 'price')} />
          </ModalBody>
          <ModalFooter>
            <Button linkBtn onClick={this.closeFeeModal}>Cancel</Button>
            <Button onClick={this.saveFeeEdits}>Submit</Button>
          </ModalFooter>
        </Modal>
      </Fragment>
    )
  }
}
