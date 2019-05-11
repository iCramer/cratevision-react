import React, { Component, Fragment } from 'react';
import {
  Button,
  Input,
  ListGroupItem,
  ListGroup,
  NoResults
} from '../../../components/core';
import { Modal, ModalFooter, ModalBody } from '../../../components/Modal';
import API from '../../../services/api';

export class Notes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prodItem: props.prodItem,
      showModal: false
    }
  }

  closeModal = () => {
    this.setState({ showModal: false });
  }

  openModal = () => {
    this.setState({ showModal: true });
  }

  save = () => {
    API.put('productitem/' + this.props.prodItem.id, this.props.prodItem).then( resp => {

    }).catch(error => {
      console.log(error.response)
    });

    this.setState({ showModal: false });
  }

  render() {
    let item = this.props.prodItem;
    return (
      <Fragment>
        <ListGroup iconList>
          { item.notes && item.notes.length &&
            item.notes.map( (note, index) => {
              return (
                <ListGroupItem icon="quote-left" key={index} justifyContent={false}>
                  {note.title}<p>{note.description}</p>
                </ListGroupItem>
              )
            })
          }
        </ListGroup>

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
