import React, { Component, Fragment } from 'react';

import { TitleBar } from '../components/TitleBar';
import { Panel } from '../components/Panel';
import { Table } from '../components/Table';
import { ListGroup, ListGroupItem } from '../components/ListGroup';
import { Block } from '../components/Block';
import { Badge } from '../components/Badge';
import API from '../services/api';

export class ProductDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      product: {},
      cost: 0,
      profit: 0
    }

    this.getProduct();
  }

  getProduct() {
    API.get('product/' + this.state.id).then(resp => {
      this.setState({ product: resp.data });
      this.calculateCost();
    }).catch(error => {
      console.log(error.response)
    });
  }

  calculateCost() {
    let fees = 0;
    this.state.product.fees.forEach( fee => {
      fees += fee.price;
    });

    let prodItemsCost = 0;
    this.state.product.productItemQuantities.forEach( item => {
      prodItemsCost += item.productItem.itemCost;
    });
    const cost = (fees + prodItemsCost).toFixed(2);
    const profit = this.state.product.msrp - cost;
    this.setState({ cost: cost, profit: profit });
  }

  render() {
    let product = this.state.product;
    let productItemColumns = [
      { label: 'Name', selector: 'productItem.name' },
      { label: 'Quantity', selector: 'count' },
      { label: 'Case Quantity', selector: 'productItem.caseQty' },
      { label: 'Item Cost', selector: 'productItem.itemCost' },
      { label: 'Supplier', selector: 'productItem.supplier.name' },
      { label: 'Description', selector: 'productItem.description' }
    ];

    const statusStyle = product.status && product.status.name === 'Active' ? 'success' : 'danger';

    return (
      <Fragment>
        <TitleBar title="Product Details" />
        <div className="container-fluid">
          <div className="row full-height-cols">
            <div className="col">
              <Panel accent="blue" title="Summary">
                <ListGroup iconList>
                  <ListGroupItem justifyContent icon="address-card">
                    Name <span>{product.name}</span>
                  </ListGroupItem>
                  <ListGroupItem justifyContent icon="tag">
                    MSRP <span>{product.msrp}</span>
                  </ListGroupItem>
                  <ListGroupItem justifyContent icon="hand-holding-usd">
                    Cost <span>{this.state.cost}</span>
                  </ListGroupItem>
                  <ListGroupItem justifyContent icon="money-bill-alt">
                    Profit <span>{this.state.profit}</span>
                  </ListGroupItem>
                  <ListGroupItem justifyContent icon="ellipsis-h">
                    Status <Badge type="blip" style={statusStyle}>{product.status && product.status.name}</Badge>
                  </ListGroupItem>
                </ListGroup>
              </Panel>
            </div>
            <div className="col">
              <Panel accent="yellow" title="Fees">
                <ListGroup iconList>
                {product.fees && product.fees.map( (fee, index) => {
                  return (
                    <ListGroupItem key={index} icon="receipt" color="yellow" justifyContent>
                      {fee.name} <span>{fee.price}</span>
                    </ListGroupItem>
                  )
                })}
                </ListGroup>
              </Panel>
            </div>
            <div className="col">
              <Panel accent="pink" title="Notes">
                {product.notes && product.notes.map( (note, index) => {
                  return (
                    <Block key={index} title={note.title}>
                      {note.description}
                    </Block>
                  )
                })}
              </Panel>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Panel accent="blue" title="Product Items">
                <Table records={product.productItemQuantities} columns={productItemColumns} />
              </Panel>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}
