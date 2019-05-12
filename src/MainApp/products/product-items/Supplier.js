import React, { Component, Fragment } from 'react';
import {
  Button,
  Input,
  Select,
  ListGroupItem,
  ListGroup,
  ListTitle,
  Badge,
  NoResults
} from '../../../components/core';
import { Modal, ModalFooter, ModalBody } from '../../../components/Modal';
import API from '../../../services/api';
import deepCopy from '../../../services/utils';

export class Supplier extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      editItem: { address: {} }
    }
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
    this.setState({ editItem: editItem });
  }

  closeModal = () => {
    this.setState({ showModal: false, editItem: { address: {} } });
  }

  openModal = () => {
    let editItem = deepCopy(this.props.prodItem.supplier);
    this.setState({ showModal: true, editItem: editItem });
  }

  save = () => {
    API.put('supplier/' + this.state.editItem.id, this.state.editItem).then( resp => {

    }).catch(error => {
      console.log(error.response)
    });

    this.setState({ showModal: false });
  }

  render() {
    let supplier = this.props.prodItem.supplier;
    let address = supplier.address;
    let editItem = this.state.editItem;

    return (
      <Fragment>
        { supplier && supplier.logo && supplier.logo.path &&
          <img src={supplier.logo.path} alt={supplier.logo.name} />
        }
        { supplier &&
          <ListGroup iconList title="Supplier Info" editClick={this.openModal}>
            <ListGroupItem icon="address-card">
              Name<span>{supplier.name}</span>
            </ListGroupItem>
            <ListGroupItem icon="map-marker-alt" justifyContent={false}>
              Address
              { address.addressLine1 && <p>{address.addressLine1}</p> }
              { address.addressLine2 && <p>{address.addressLine2}</p> }
              { address.city && <p>{address.city}</p> }
              { address.state && <p>{address.state}</p> }
              { address.zipCode && <p>{address.zipCode}</p> }
              { address.country && <p>{address.country}</p> }
            </ListGroupItem>
          </ListGroup>
        }
        { supplier && supplier.notes &&
          <ListGroup title="Notes" iconList>
            { supplier.notes && supplier.notes.length &&
              supplier.notes.map( (note, index) => {
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
            <form>
              <div className="container">
                <div className="row">
                  <div className="col-sm-6">
                    <Input key="name" name="name" label="Name" value={editItem.name} onChange={(evt) => this.updateItem(evt)} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <Input key="address1" name="addressLine1" label="Address Line 1" value={editItem.address.addressLine1} onChange={(evt) => this.updateItem(evt, 'address')} />
                  </div>
                  <div className="col-sm-6">
                    <Input key="address2" name="addressLine2" label="Address Line 2" value={editItem.address.addressLine2} onChange={(evt) => this.updateItem(evt, 'address')} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <Input key="city" name="city" label="City" value={editItem.address.city} onChange={(evt) => this.updateItem(evt, 'address')} />
                  </div>
                  <div className="col-sm-6">
                    <Select key="state" name="state" options={states} label="State" value={editItem.address.addressLine2} onChange={(evt) => this.updateItem(evt, 'address')} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <Input key="zipCode" name="zipCode" label="Zip Code" value={editItem.address.zipCode} onChange={(evt) => this.updateItem(evt, 'address')} />
                  </div>
                  <div className="col-sm-6">
                    <Input key="country" name="country" label="Country" value={editItem.address.country} onChange={(evt) => this.updateItem(evt, 'address')} />
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

const states = [
    {
        label: "Alabama",
        value: "AL"
    },
    {
        label: "Alaska",
        value: "AK"
    },
    {
        label: "American Samoa",
        value: "AS"
    },
    {
        label: "Arizona",
        value: "AZ"
    },
    {
        label: "Arkansas",
        value: "AR"
    },
    {
        label: "California",
        value: "CA"
    },
    {
        label: "Colorado",
        value: "CO"
    },
    {
        label: "Connecticut",
        value: "CT"
    },
    {
        label: "Delaware",
        value: "DE"
    },
    {
        label: "District Of Columbia",
        value: "DC"
    },
    {
        label: "Federated States Of Micronesia",
        value: "FM"
    },
    {
        label: "Florida",
        value: "FL"
    },
    {
        label: "Georgia",
        value: "GA"
    },
    {
        label: "Guam",
        value: "GU"
    },
    {
        label: "Hawaii",
        value: "HI"
    },
    {
        label: "Idaho",
        value: "ID"
    },
    {
        label: "Illinois",
        value: "IL"
    },
    {
        label: "Indiana",
        value: "IN"
    },
    {
        label: "Iowa",
        value: "IA"
    },
    {
        label: "Kansas",
        value: "KS"
    },
    {
        label: "Kentucky",
        value: "KY"
    },
    {
        label: "Louisiana",
        value: "LA"
    },
    {
        label: "Maine",
        value: "ME"
    },
    {
        label: "Marshall Islands",
        value: "MH"
    },
    {
        label: "Maryland",
        value: "MD"
    },
    {
        label: "Massachusetts",
        value: "MA"
    },
    {
        label: "Michigan",
        value: "MI"
    },
    {
        label: "Minnesota",
        value: "MN"
    },
    {
        label: "Mississippi",
        value: "MS"
    },
    {
        label: "Missouri",
        value: "MO"
    },
    {
        label: "Montana",
        value: "MT"
    },
    {
        label: "Nebraska",
        value: "NE"
    },
    {
        label: "Nevada",
        value: "NV"
    },
    {
        label: "New Hampshire",
        value: "NH"
    },
    {
        label: "New Jersey",
        value: "NJ"
    },
    {
        label: "New Mexico",
        value: "NM"
    },
    {
        label: "New York",
        value: "NY"
    },
    {
        label: "North Carolina",
        value: "NC"
    },
    {
        label: "North Dakota",
        value: "ND"
    },
    {
        label: "Northern Mariana Islands",
        value: "MP"
    },
    {
        label: "Ohio",
        value: "OH"
    },
    {
        label: "Oklahoma",
        value: "OK"
    },
    {
        label: "Oregon",
        value: "OR"
    },
    {
        label: "Palau",
        value: "PW"
    },
    {
        label: "Pennsylvania",
        value: "PA"
    },
    {
        label: "Puerto Rico",
        value: "PR"
    },
    {
        label: "Rhode Island",
        value: "RI"
    },
    {
        label: "South Carolina",
        value: "SC"
    },
    {
        label: "South Dakota",
        value: "SD"
    },
    {
        label: "Tennessee",
        value: "TN"
    },
    {
        label: "Texas",
        value: "TX"
    },
    {
        label: "Utah",
        value: "UT"
    },
    {
        label: "Vermont",
        value: "VT"
    },
    {
        label: "Virgin Islands",
        value: "VI"
    },
    {
        label: "Virginia",
        value: "VA"
    },
    {
        label: "Washington",
        value: "WA"
    },
    {
        label: "West Virginia",
        value: "WV"
    },
    {
        label: "Wisconsin",
        value: "WI"
    },
    {
        label: "Wyoming",
        value: "WY"
    }
  ]
