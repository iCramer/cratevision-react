import React, { Component } from 'react';

import { Panel, Button, Input, ListGroupItem, ListGroup, ListTitle, Badge, Tab, NoResults } from '../../components/core';
import { Modal, ModalFooter, ModalBody } from '../../components/Modal';
import { SliderPanel } from '../../components/SliderPanel';
import API from '../../services/api';

export class ProductItemPanel extends Component {
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
      <SliderPanel open={this.props.open} title="Product Item Details" closePanel={this.props.closePanel} item={this.state.item}>
        <Tab title="Item Info" tabKey="basic-info">
          { item.picture && item.picture.path &&
            <img src={item.picture.path} alt={item.picture.name} />
          }
          <ListGroup title="Basic Info" iconList>
            <ListGroupItem icon="address-card" justifyContent>
              Name<span>{item.name}</span>
            </ListGroupItem>
            <ListGroupItem icon="hand-holding-usd" justifyContent>
              Item Cost<Badge>{item.itemCost}</Badge>
            </ListGroupItem>
            <ListGroupItem icon={['far', 'box-usd']} justifyContent>
              Case Cost<Badge>{item.caseCost}</Badge>
            </ListGroupItem>
            <ListGroupItem icon={['far', 'tally']} justifyContent>
              Items per Case<Badge>{item.caseQty}</Badge>
            </ListGroupItem>
            <ListGroupItem icon={['far', 'comment-alt-lines']}>
              Description<p>{item.description}</p>
            </ListGroupItem>
          </ListGroup>

          <ListTitle>Product Identifiers</ListTitle>
          { item.productIdentifiers && !item.productIdentifiers.length &&
            <NoResults header="No Product Identifiers Assigned" icon={['far', 'id-card-alt']} action={() => console.log('click')} btnLabel="Create One" />
          }
          { item.productIdentifiers && item.productIdentifiers.map( (id, index) => {
            return (
              <ListGroup>
                <ListGroupItem>
                  Name<span>{id.name}</span>
                </ListGroupItem>
                <ListGroupItem>
                  Identifier<span>{id.identifier}</span>
                </ListGroupItem>
                <ListGroupItem>
                  Type<span>{id.type}</span>
                </ListGroupItem>
              </ListGroup>
            )
          })}
        </Tab>

        <Tab title="Inventory" tabKey="inventory">
        { item.inventory && !item.inventory.length &&
          <NoResults header="No Inventory Found" icon="inventory" action={() => console.log('click')} btnLabel="Create One" />
        }
        { item.inventory && item.inventory.map( (obj, index) => {
            return (
              <ListGroup iconList>
                <ListGroupItem icon="address-card" justifyContent>
                  Name<span>{obj.name}</span>
                </ListGroupItem>
                <ListGroupItem icon="address-card" justifyContent>
                  Warehouse<span>{obj.warehouse.name}</span>
                </ListGroupItem>
                <ListGroupItem icon="address-card" justifyContent>
                  Availible<span>{obj.availible}</span>
                </ListGroupItem>
                <ListGroupItem icon="address-card" justifyContent>
                  On Hande<span>{obj.onHand}</span>
                </ListGroupItem>
                <ListGroupItem icon="address-card" justifyContent>
                  Reserved<span>{obj.reserved}</span>
                </ListGroupItem>
              </ListGroup>
            )
          })
        }
        </Tab>

        <Tab title="Supplier" tabKey="supplier">
          { item.supplier && item.supplier.logo && item.supplier.logo.path &&
            <img src={item.supplier.logo.path} alt={item.supplier.logo.name} />
          }
          { item.supplier &&
            <ListGroup iconList>
              <ListGroupItem icon="address-card" justifyContent>
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
                    <ListGroupItem icon="quote-left" key={index}>
                      {note.title}<p>{note.description}</p>
                    </ListGroupItem>
                  )
                })
              }
            </ListGroup>
          }
          </Tab>

          <Tab title="Notes" tabKey="notes">
            <ListGroup iconList>
              { item.notes && item.notes.length &&
                item.notes.map( (note, index) => {
                  return (
                    <ListGroupItem icon="quote-left" key={index}>
                      {note.title}<p>{note.description}</p>
                    </ListGroupItem>
                  )
                })
              }
            </ListGroup>
        </Tab>
      </SliderPanel>
    )
  }
}
