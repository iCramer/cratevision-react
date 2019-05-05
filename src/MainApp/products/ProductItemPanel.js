import React, { Component } from 'react';

import { Panel, Button, Input, ListGroupItem, ListGroup, ListTitle, Badge, Tab, NoResults, Select } from '../../components/core';
import { Modal, ModalFooter, ModalBody } from '../../components/Modal';
import { SliderPanel } from '../../components/SliderPanel';

import { BasicInfo } from './product-items/BasicInfo';
import { Inventory } from './product-items/Inventory';
import { Supplier } from './product-items/Supplier';
import { Notes } from './product-items/Notes';

import API from '../../services/api';

export class ProductItemPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: props.item,
      showModal: false
    };
  }

  updateItem = (evt, field) => {
    let newItem = this.state.item;
    newItem[field] = evt.target.value;
    this.setState({item: newItem});
  }

  closeModal = () => {
    this.setState({ showModal: false });
  }

  openModal = (title, content) => {
    this.setState({ showModal: true, getModalContent: content, modalTitle: title });
  }

  save = () => {
    API.put('productitem/' + this.state.item.id, this.state.item).then( resp => {

    }).catch(error => {
      console.log(error.response)
    });

    this.setState({ showModal: false });
  }

  render() {
    let item = this.state.item;
    return (
      <SliderPanel open={this.props.open} title="Product Item Details" closePanel={this.props.closePanel} item={this.state.item}>
        <Tab title="Item Info" tabKey="basic-info">
          <BasicInfo prodItem={item} key="basic-info-panel" />
        </Tab>

        <Tab title="Inventory" tabKey="inventory">
          <Inventory prodItem={item} />
        </Tab>

        <Tab title="Supplier" tabKey="supplier">
          <Supplier prodItem={item} />
        </Tab>

        <Tab title="Notes" tabKey="notes">
          <Notes prodItem={item} />
        </Tab>

        <Modal title={this.state.modalTitle} open={this.state.showModal}>
          <ModalBody>
            { this.state.getModalContent &&
              this.state.getModalContent()
            }
          </ModalBody>
          <ModalFooter>
            <Button linkBtn onClick={this.closeModal}>Cancel</Button>
            <Button type="submit" onClick={this.save}>Save</Button>
          </ModalFooter>
        </Modal>
      </SliderPanel>
    )
  }
}
