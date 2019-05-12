import React, { Component, Fragment } from 'react';
import {
  Button,
  Input,
  Select,
  ListGroupItem,
  ListGroup,
  Badge,
  NoResults
} from '../../../components/core';
import { Modal, ModalFooter, ModalBody } from '../../../components/Modal';
import API from '../../../services/api';
import deepCopy from '../../../services/utils';

export class Inventory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      warehouses: [],
      warehouseSelectOptions: [],
      showModal: false,
      editItem: {}
    }

    this.getWarehouses();
  }

  getWarehouses() {
    API.get('warehouse/all').then( resp => {
      let options = [];
      resp.data.forEach( item => {
        options.push({ label: item.name, value: item.id })
      });
      this.setState({ warehouses: resp.data, warehouseSelectOptions: options });
    }).catch( error => {
      console.log('error');
    });
  }

  updateItem = (evt, parentKey) => {
    let editItem = this.state.editItem;
    const { value, name } = evt.target;
    if(parentKey) {
      editItem[parentKey][name] = value;
    }
    else {
      editItem[name] = value;
    }

    this.setState({editItem: editItem});
  }

  closeModal = () => {
    this.setState({ showModal: false });
  }

  openModal = (obj) => {
    let editItem;
    if(obj) {
      editItem = deepCopy(obj);
    }
    else {
      editItem = { availible: '', onhand: '', warehouse: {}, reserved: '' };
    }
    this.setState({ showModal: true, editItem: editItem });
  }

  save = () => {
    let inventory = this.props.prodItem.inventory;
    let editItem = this.state.editItem;
    const index = inventory.findIndex( obj => obj.id === editItem.id );
    if(index > -1) {
      inventory[index] = editItem;
    }
    else {
      inventory.push(editItem);
    }
    const body = { inventory: inventory };
    API.put('productitem/' + this.props.prodItem.id, body).then( resp => {

    }).catch(error => {
      console.log(error.response)
    });

    this.setState({ showModal: false });
  }

  render() {
    let inventory = this.props.prodItem.inventory;
    let editItem = this.state.editItem;

    return (
      <Fragment>
        { inventory && !inventory.length &&
          <NoResults header="No Inventory Found" icon="inventory" action={() => this.openModal()} btnLabel="Create One" />
        }
        { inventory && inventory.map( (item, index) => {
            return (
              <ListGroup iconList title={`Warehouse ${index + 1}`} editClick={() => this.openModal(item)} key={`inventory-${index}`}>
                <ListGroupItem icon="address-card">
                  Warehouse<span>{item.warehouse.name}</span>
                </ListGroupItem>
                <ListGroupItem icon="address-card">
                  Availible<span>{item.availible}</span>
                </ListGroupItem>
                <ListGroupItem icon="address-card">
                  On Hand<span>{item.onhand}</span>
                </ListGroupItem>
                <ListGroupItem icon="address-card">
                  Reserved<span>{item.reserved}</span>
                </ListGroupItem>
              </ListGroup>
            )
          })
        }

        <Button
          linkBtn
          size="xs"
          icon={['far', 'plus-circle']}
          onClick={this.openModal}
        >
          Add Inventory
        </Button>

        <Modal title="Edit Inventory" open={this.state.showModal}>
          <ModalBody>
            <form>
              <div className="container">
                <div className="row">
                  <div className="col-sm-3">
                    <Input key="inventory-availible" name="availible" type="number" label="Availible" value={editItem.availible} onChange={(evt) => this.updateItem(evt)} />
                  </div>
                  <div className="col-sm-3">
                    <Input key="inventory-onhand" label="On Hand" name="onhand" type="number" value={editItem.onhand} onChange={(evt) => this.updateItem(evt)} />
                  </div>
                  <div className="col-sm-3">
                    <Input key="inventory-reserved" label="Reserved" name="reserved" type="number" value={editItem.reserved} onChange={(evt) => this.updateItem(evt)} />
                  </div>
                  <div className="col-sm-4">
                    <Select
                      key="inventory-warehouse"
                      label="Warehouse"
                      name="id"
                      options={this.state.warehouseSelectOptions}
                      value={editItem.warehouse && editItem.warehouse.id}
                      onChange={(evt) => this.updateItem(evt, 'warehouse')}
                    />
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
