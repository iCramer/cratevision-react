import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { TitleBar, Panel, ListGroup, ListGroupItem, Badge, Block } from '../components/core';
import { Table } from '../components/Table';
import API from '../services/api';

export class ProductOrderDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      order: {}
    }

    this.getOrder();
  }

  getOrder() {
    API.get('productorder/' + this.state.id).then(resp => {
      this.setState({ order: resp.data });
    }).catch(error => {
      console.log(error.response)
    });
  }

  render() {
    const order = this.state.order;
    const statusStyle = order.status && order.status.name === 'Active' ? 'success' : 'danger';
    const productColumns = [
      {
        label: 'Name',
        render: obj => <Link to={'/products/' + obj.id}>{obj.product.name}</Link>
      },
      { label: 'Count', selector: 'product.count' },
      { label: 'MSRP', selector: 'product.product.msrp' },
      {
        label: 'Status',
        render: obj => {
          const badgeStyle = obj.product.status.name === 'Active' ? 'success' : 'danger';
          return (
            <Badge badgeType="blip" badgeStyle={badgeStyle}>{obj.product.status.name}</Badge>
          )
        }
      }
    ];

    return (
      <Fragment>
        <TitleBar title="Product Order Details" />
        <div className="container-fluid">
          <div className="row full-height-cols">
            <div className="col">
              <Panel accent="blue" title="Summary">
                <ListGroup iconList>
                  <ListGroupItem icon="address-card">
                    Delivery Date <span>{order.deliveredOn}</span>
                  </ListGroupItem>
                  <ListGroupItem icon="tag">
                    Internal Id <span>{order.internalId}</span>
                  </ListGroupItem>
                  <ListGroupItem icon="ellipsis-h">
                    Status <Badge type="blip" badgeStyle={statusStyle}>{order.status && order.status.name}</Badge>
                  </ListGroupItem>
                </ListGroup>
              </Panel>
            </div>
            <div className="col">
              <Panel accent="yellow" title="Fees">
                <ListGroup iconList>
                {order.fees && order.fees.map( (fee, index) => {
                  return (
                    <ListGroupItem key={'fee-' + index} icon="receipt" color="yellow">
                      {fee.name} <span>{fee.price}</span>
                    </ListGroupItem>
                  )
                })}
                </ListGroup>
              </Panel>
            </div>
            <div className="col">
              <Panel accent="pink" title="Notes">
                {order.notes && order.notes.map( (note, index) => {
                  return (
                    <Block key={'block-' + index} title={note.title}>
                      {note.description}
                    </Block>
                  )
                })}
              </Panel>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Panel accent="blue" title="Products">
                <Table records={order.productQuantities} columns={productColumns} />
              </Panel>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}
