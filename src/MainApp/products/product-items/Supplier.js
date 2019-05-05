import React, { Component, Fragment } from 'react';
import {
  Button,
  Input,
  ListGroupItem,
  ListGroup,
  ListTitle,
  Badge,
  NoResults
} from '../../../components/core';
import { Modal, ModalFooter, ModalBody } from '../../../components/Modal';
import API from '../../../services/api';

export class Supplier extends Component {
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
        { item.supplier && item.supplier.logo && item.supplier.logo.path &&
          <img src={item.supplier.logo.path} alt={item.supplier.logo.name} />
        }
        { item.supplier &&
          <ListGroup iconList>
            <ListGroupItem icon="address-card">
              Name<span>{item.supplier.name}</span>
            </ListGroupItem>
            <ListGroupItem icon="map-marker-alt">
              Address
              { item.supplier.address.addressLine1 && <p>{item.supplier.address.addressLine1}</p> }
              { item.supplier.address.addressLine2 && <p>{item.supplier.address.addressLine2}</p> }
              { item.supplier.address.city && <p>{item.supplier.address.city}</p> }
              { item.supplier.address.state && <p>{item.supplier.address.state}</p> }
              { item.supplier.address.zipCode && <p>{item.supplier.address.zipCode}</p> }
              { item.supplier.address.country && <p>{item.supplier.address.country}</p> }
            </ListGroupItem>
          </ListGroup>
        }
        { item.supplier && item.supplier.notes &&
          <ListGroup title="Notes" iconList>
            { item.supplier.notes && item.supplier.notes.length &&
              item.supplier.notes.map( (note, index) => {
                return (
                  <ListGroupItem icon="quote-left" key={index} justifyContent={false}>
                    {note.title}<p>{note.description}</p>
                  </ListGroupItem>
                )
              })
            }
          </ListGroup>
        }

        <Modal title="Edit Supplier" open={this.state.showModal}>
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
