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

export class BasicInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prodItem: props.prodItem,
      showModal: false,
      getModalContent: null,
      modalTitle: '',
      editObj: {}
    }
  }

  updateItem = (evt, obj, parentKey) => {
    let newItem = this.state.prodItem;
    const value = evt.target.value;
    const name = evt.target.name;

    if (obj && parentKey) {
      let newObj = newItem[parentKey].find(x => x.id === obj.id);
      if (newObj) {
        newObj[parentKey] = value;
      }
      else {
        newItem[parentKey].push({ [name]: value });
      }
    }
    else if (parentKey && !obj) {
      newItem[parentKey][name] = value;
    }
    else {
      newItem[name] = value;
    }
    this.setState({prodItem: newItem});
  }

  closeModal = () => {
    this.setState({ showModal: false });
  }

  openModal = (title, content, obj) => {
    let editObj = obj || {};
    this.setState({ showModal: true, getModalContent: content, modalTitle: title, editObj: editObj });
  }

  save = () => {
    API.put('productitem/' + this.state.prodItem.id, this.state.prodItem).then( resp => {

    }).catch(error => {
      console.log(error.response)
    });

    this.setState({ showModal: false });
  }

  getBasicInfoModal = () => {
    const item = this.state.prodItem;
    return (
      <form onSubmit={(evt) => console.log(evt)}>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <Input key="info-name" label="Name" name="name" value={item.name} onChange={(evt) => this.updateItem(evt)} />
            </div>
            <div className="col-sm-4">
              <Input key="info-item-cost" label="Item Cost" name="itemCost" type="number" value={item.itemCost} onChange={(evt) => this.updateItem(evt)} />
            </div>
            <div className="col-sm-4">
              <Input key="info-case-cost" label="Case Cost" name="caseCost" type="number" value={item.caseCost} onChange={(evt) => this.updateItem(evt)} />
            </div>
            <div className="col-sm-4">
              <Input key="info-per-case" label="Items Per Case" name="caseQty" type="number" value={item.caseQty} onChange={(evt) => this.updateItem(evt)} />
            </div>
            <div className="col-sm-12">
              <Input key="info-desc" textarea label="Description" name="description" value={item.description} onChange={(evt) => this.updateItem(evt)} />
            </div>
          </div>
        </div>
      </form>
    )
  }

  getIdentifierModal = () => {
    let item = this.state.editObj;
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
      <form>
        <div className="container">
          <div className="row">
            <div className="col-sm-3">
              <Select key="prod-id-type" label="Type" name="type" value={item.type || ''} options={options} onChange={(evt) => this.updateItem(evt, item, 'productIdentifiers')} />
            </div>
            <div className="col-sm-5">
              <Input key="prod-id-name" label="Name" name="name" value={item.name} onChange={(evt) => this.updateItem(evt, item, 'productIdentifiers')} />
            </div>
            <div className="col-sm-4">
              <Input key="prod-id" label="Identifier" name="identifier" value={item.identifier} onChange={(evt) => this.updateItem(evt, item, 'productIdentifiers')} />
            </div>
          </div>
        </div>
      </form>
    )
  }

  render() {
    let item = this.state.prodItem;
    let tableColumns = [
      { label: 'Type', selector: 'type' },
      { label: 'Name', selector: 'name' },
      { label: 'Identifier', selector: 'identifier' }
    ];
    let tableActions = [
      { icon: 'edit', clickHandler: obj => this.openModal('Edit Product Identifier', this.getIdentifierModal, obj) }
    ];
    return (
      <Fragment>
        { item.picture && item.picture.path &&
          <img src={item.picture.path} alt={item.picture.name} />
        }
        <ListGroup title="Basic Info" iconList editClick={() => this.openModal('Edit Product Item', this.getBasicInfoModal)}>
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
              onClick={() => this.openModal('New Product Identifier', this.getIdentifierModal)}
            >
              Add Product Identifier
            </Button>
          </Fragment>
        }

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
      </Fragment>
    )
  }
}
