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

export class Inventory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prodItem: props.prodItem,
      warehouses: [],
      warehouseSelectOptions: [],
      showModal: false,
      editObj: null
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
    let prodItem = this.state.prodItem;
    let editObj = this.state.editObj;
    let name = evt.target.name;
    let value = evt.target.value;
    if(parentKey) {
      editObj[parentKey][name] = value;
    }
    else {
      editObj[name] = evt.target.value;
    }
    let inventoryItem = prodItem.inventory.find( x => x.id === editObj.id);
    if(inventoryItem) {
      inventoryItem = editObj;
    }
    else {
      prodItem.inventory.push(editObj);
    }
    this.setState({prodItem: prodItem});
  }

  closeModal = () => {
    this.setState({ showModal: false });
  }

  openModal = (obj) => {
    let editObj;
    if(obj) {
      editObj = obj;
    }
    else {
      editObj = { availible: '', onhand: '', warehouse: {}, reserved: '' };
    }
    this.setState({ showModal: true, editObj: editObj });
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
          <NoResults header="No Inventory Found" icon="inventory" action={() => this.openModal()} btnLabel="Create One" />
        }
        { item.inventory && item.inventory.map( (obj, index) => {
            return (
              <ListGroup iconList key={`inventory-${index}`}>
                <ListGroupItem icon="address-card">
                  Warehouse<span>{obj.warehouse.name}</span>
                </ListGroupItem>
                <ListGroupItem icon="address-card">
                  Availible<span>{obj.availible}</span>
                </ListGroupItem>
                <ListGroupItem icon="address-card">
                  On Hand<span>{obj.onhand}</span>
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
            <form>
              <div className="container">
                <div className="row">
                  <div className="col-sm-3">
                    <Input key="inventory-availible" name="availible" type="number" label="Availible" value={item.availible} onChange={(evt) => this.updateItem(evt)} />
                  </div>
                  <div className="col-sm-3">
                    <Input key="inventory-onhand" label="On Hand" name="onhand" type="number" value={item.onhand} onChange={(evt) => this.updateItem(evt)} />
                  </div>
                  <div className="col-sm-3">
                    <Input key="inventory-reserved" label="Reserved" name="reserved" type="number" value={item.reserved} onChange={(evt) => this.updateItem(evt)} />
                  </div>
                  <div className="col-sm-4">
                    <Select
                      key="inventory-warehouse"
                      label="Warehouse"
                      name="id"
                      options={this.state.warehouseSelectOptions}
                      value={item.warehouse && item.warehouse.id}
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
