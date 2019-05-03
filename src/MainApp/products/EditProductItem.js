import React, { Component, Fragment } from 'react';

import { Panel, Button, Input } from '../../components/core';
import { Modal, ModalFooter, ModalBody } from '../../components/Modal';
import API from '../../services/api';

export class EditProductItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: props.item,
      changePic: props.item.picture && props.item.picture.path
    };
  }

  updateItem = (evt, field) => {
    let newItem = this.state.item;
    newItem[field] = evt.target.value;
    this.setState({item: newItem})
  }

  render() {
    const item = this.state.item;
    return (
      <Modal title="Edit Product Item" open={this.props.open} size="xl">
        <ModalBody>
          <div className="container-fluid">
            <div className="row">
              <div className="col">
                <Input label="Name" value={item.name} onChange={evt => this.updateItem(evt, 'name')} />
                { this.state.changePic ?
                  <Fragment>
                    <img src={item.picture.path} alt={item.picture.name} />
                    <Button linkBtn onClick={this.changeImg}>Change</Button>
                  </Fragment>
                  :
                  <Input type="file" label="Picture" />
                }
                <Input textarea label="Description" value={item.description} onChange={evt => this.updateItem(evt, 'description')} />
              </div>
              <div className="col offset-1">
                <Input label="Item Cost" type="number" value={item.itemCost} onChange={evt => this.updateItem(evt, 'itemCost')} />
                <Input label="Case Cost" type="number" value={item.caseCost} onChange={evt => this.updateItem(evt, 'caseCost')} />
                <Input label="Items Per Case" type="number" value={item.caseQty} onChange={evt => this.updateItem(evt, 'caseQty')} />
              </div>
              <div className="col offset-1">
                <label>Notes</label>
                { item.notes && item.notes.map( (note, index) => {
                  return (
                    <Fragment key={index}>
                      <Input value={note.title} onChange={evt => this.updateItem(evt, '')} />
                      <Input value={note.description} onChange={evt => this.updateItem(evt, '')} />
                    </Fragment>
                  )
                })}
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button linkBtn onClick={this.props.toggleModal}>Cancel</Button>
          <Button>Submit</Button>
        </ModalFooter>
      </Modal>
    )
  }
}
