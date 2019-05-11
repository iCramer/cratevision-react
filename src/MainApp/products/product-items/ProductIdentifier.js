import React, { Component, Fragment } from 'react';
import {
  Button,
  Input,
  ListGroupItem,
  ListGroup,
  ListTitle,
  Badge,
  NoResults,
  Select
} from '../../../components/core';
import { Modal, ModalFooter, ModalBody } from '../../../components/Modal';
import { Table, TableRow } from '../../../components/Table';
import API from '../../../services/api';

export class ProductIdentifier extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      modalTitle: '',
      editItem: {}
    }
  }

  closeModal = () => {
    this.setState({ showModal: false, editItem: {} });
  }

  openModal = (obj) => {
    let editItem = obj || { type: 'SKU' };
    this.setState({ showModal: true, editItem: editItem });
  }

  updateItem = (evt) => {
    const { value, name } = evt.target;
    this.setState( state => ({ editItem: {...state.editItem, [name]: value }}));
  }

  save = () => {
    let prodIds = this.props.prodItem.productIdentifiers;
    let editItem = this.state.editItem;
    const index = prodIds.findIndex( obj => obj.id === editItem.id );
    if(index > -1) {
      prodIds[index] = editItem;
    }
    else {
      prodIds.push(editItem);
    }
    const body = { productIdentifiers: prodIds };
    API.put('productitem/' + this.props.prodItem.id, body).then( resp => {

    }).catch(error => {
      console.log(error.response)
    });

    this.setState({ showModal: false, editItem: {} });
  }

  render() {
    let item = this.props.prodItem;
    let editItem = this.state.editItem;
    const tableColumns = [
      { label: 'Type', selector: 'type' },
      { label: 'Name', selector: 'name' },
      { label: 'Identifier', selector: 'identifier' }
    ];
    const tableActions = [
      { icon: 'edit', clickHandler: obj => this.openModal(obj) }
    ];
    const options = [
      { label: 'SKU', value: 'SKU' },
      { label: 'ASIN', value: 'ASIN' },
      { label: 'UPC', value: 'UPC' },
      { label: 'GTIN', value: 'GTIN' },
      { label: 'GCID', value: 'GCID' },
      { label: 'EPID', value: 'EPID' },
      { label: 'EAN', value: 'EAN' },
      { label: 'ISBN', value: 'ISBN' },
      { label: 'FNSKU', value: 'FNSKU' }
    ];

    return (
      <Fragment>
        <ListTitle>Product Identifiers</ListTitle>
        { item.productIdentifiers && !item.productIdentifiers.length &&
          <NoResults
            header="No Product Identifiers Assigned"
            icon={['far', 'id-card-alt']}
            action={() => this.openModal('New Product Identifier', this.getIdentifierModal)}
            btnLabel="Create One"
            />
        }
        { item.productIdentifiers && item.productIdentifiers.length > 0 &&
          <Fragment>
            <Table records={item.productIdentifiers} columns={tableColumns} actions={tableActions} />
            <Button
              linkBtn
              size="xs"
              icon={['far', 'plus-circle']}
              onClick={this.openModal}
            >
              Add Product Identifier
            </Button>
          </Fragment>
        }

        <Modal title="Product Identifier" open={this.state.showModal}>
          <ModalBody>
            <form>
              <div className="container">
                <div className="row">
                  <div className="col-sm-3">
                    <Select label="Type" name="type" value={editItem.type} options={options} onChange={(evt) => this.updateItem(evt)} />
                  </div>
                  <div className="col-sm-5">
                    <Input label="Name" name="name" value={editItem.name} onChange={(evt) => this.updateItem(evt)} />
                  </div>
                  <div className="col-sm-4">
                    <Input label="Identifier" name="identifier" value={editItem.identifier} onChange={(evt) => this.updateItem(evt)} />
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
