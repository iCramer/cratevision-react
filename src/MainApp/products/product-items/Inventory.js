import React, { Component, Fragment } from 'react';
import {
  Button,
  Input,
  ListGroupItem,
  ListGroup,
  Badge,
  NoResults
} from '../../../components/core';
import { Modal, ModalFooter, ModalBody } from '../../../components/Modal';
import API from '../../../services/api';

export class Inventory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prodItem: props.prodItem,
      showModal: false
    }
  }

  updateItem = (evt, field) => {
    let newItem = this.state.prodItem;
    newItem[field] = evt.target.value;
    this.setState({prodItem: newItem});
  }

  closeModal = () => {
    this.setState({ showModal: false });
  }

  openModal = () => {
    this.setState({ showModal: true });
  }

  save = () => {
    API.put('productitem/' + this.state.prodItem.id, this.state.prodItem).then( resp => {

    }).catch(error => {
      console.log(error.response)
    });

    this.setState({ showModal: false });
  }

  render() {
    let item = this.state.prodItem;
    return (
      <Fragment>
        { item.inventory && !item.inventory.length &&
          <NoResults header="No Inventory Found" icon="inventory" action={() => console.log('click')} btnLabel="Create One" />
        }
        { item.inventory && item.inventory.map( (obj, index) => {
            return (
              <ListGroup iconList>
                <ListGroupItem icon="address-card">
                  Name<span>{obj.name}</span>
                </ListGroupItem>
                <ListGroupItem icon="address-card">
                  Warehouse<span>{obj.warehouse.name}</span>
                </ListGroupItem>
                <ListGroupItem icon="address-card">
                  Availible<span>{obj.availible}</span>
                </ListGroupItem>
                <ListGroupItem icon="address-card">
                  On Hand<span>{obj.onHand}</span>
                </ListGroupItem>
                <ListGroupItem icon="address-card">
                  Reserved<span>{obj.reserved}</span>
                </ListGroupItem>
              </ListGroup>
            )
          })
        }

        <Modal title="Edit Inventory" open={this.state.showModal}>
          <ModalBody>

          </ModalBody>
          <ModalFooter>
            <Button linkBtn onClick={this.closeModal}>Cancel</Button>
            <Button type="submit" onClick={this.save}>Save</Button>
          </ModalFooter>
        </Modal>
      </Fragment>
    )
  }
}
