import React, { Component, Fragment } from 'react';
import {
  Button,
  Input,
  ListGroupItem,
  ListGroup,
  ListTitle,
  Badge
} from '../../../components/core';
import { Modal, ModalFooter, ModalBody } from '../../../components/Modal';
import API from '../../../services/api';
import deepCopy from '../../../services/utils';

export class BasicInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      editItem: {}
    }
  }

  updateItem = (evt) => {
    const { value, name } = evt.target;
    this.setState( state => ({ editItem: { ...state.editItem, [name]: value }}));
  }

  closeModal = () => {
    this.setState({ showModal: false, editItem: {} });
  }

  openModal = () => {
    let editItem = deepCopy(this.props.prodItem);
    this.setState({ showModal: true, editItem: editItem });
  }

  save = () => {
    API.put('productitem/' + this.props.prodItem.id, this.state.editItem).then( resp => {

    }).catch(error => {
      console.log(error.response)
    });

    this.setState({ showModal: false, editItem: {} });
  }

  render() {
    let item = this.props.prodItem;
    let editItem = this.state.editItem;

    return (
      <Fragment>
        { item.picture && item.picture.path &&
          <img src={item.picture.path} alt={item.picture.name} />
        }
        <ListGroup title="Basic Info" iconList editClick={() => this.openModal()}>
          <ListGroupItem icon="address-card">
            Name<span>{item.name}</span>
          </ListGroupItem>
          <ListGroupItem icon="hand-holding-usd">
            Item Cost<Badge>{item.itemCost}</Badge>
          </ListGroupItem>
          <ListGroupItem icon={['far', 'box-usd']}>
            Case Cost<Badge>{item.caseCost}</Badge>
          </ListGroupItem>
          <ListGroupItem icon={['far', 'tally']}>
            Items per Case<Badge>{item.caseQty}</Badge>
          </ListGroupItem>
          <ListGroupItem icon={['far', 'comment-alt-lines']} justifyContent={false}>
            Description<p>{item.description}</p>
          </ListGroupItem>
        </ListGroup>

        <Modal title="Edit Basic Info" open={this.state.showModal}>
          <ModalBody>
            <form>
              <div className="container">
                <div className="row">
                  <div className="col-sm-12">
                    <Input key="info-name" label="Name" name="name" value={editItem.name} onChange={(evt) => this.updateItem(evt)} />
                  </div>
                  <div className="col-sm-4">
                    <Input key="info-item-cost" label="Item Cost" name="itemCost" type="number" value={editItem.itemCost} onChange={(evt) => this.updateItem(evt)} />
                  </div>
                  <div className="col-sm-4">
                    <Input key="info-case-cost" label="Case Cost" name="caseCost" type="number" value={editItem.caseCost} onChange={(evt) => this.updateItem(evt)} />
                  </div>
                  <div className="col-sm-4">
                    <Input key="info-per-case" label="Items Per Case" name="caseQty" type="number" value={editItem.caseQty} onChange={(evt) => this.updateItem(evt)} />
                  </div>
                  <div className="col-sm-12">
                    <Input key="info-desc" textarea label="Description" name="description" value={editItem.description} onChange={(evt) => this.updateItem(evt)} />
                  </div>
                </div>
              </div>
            </form>
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
