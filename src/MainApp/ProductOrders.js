import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { TitleBar } from '../components/TitleBar';
import { Panel } from '../components/Panel';
import { Table } from '../components/Table';
import { Badge } from '../components/Badge';
import API from '../services/api';
import { Filter } from '../Filter';

export class ProductOrders extends Component {
  constructor() {
    super();
    this.state = {
      orders: [],
      filteredOrders: [],
      viewDetails: false
    }
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    API.get('productorder/all').then(resp => {
      this.setState({ orders: resp.data || [], filteredOrders: resp.data });
    }).catch(error => {
      console.log(error.response)
    });
  }

  filter(evt) {
    const data = Filter([{field: 'all', value: evt.target.value}], this.state.orders);
    this.setState({filteredOrders: data});
  }

  onRowClick = (row, evt) => {
    if(evt.target.tagName === 'TD') {
      this.setState({viewDetails: true, detailsId: row.id});
    }
  };

  render() {
    const columns = [
        { label: 'ID', selector: 'internalId'},
        { label: 'Delivery Date', selector: 'deliveredOn' },
        { label: 'Product Quantity',
          render: obj => {
            return <Badge>{obj.productQuantities.length}</Badge>;
          }
        },
        {
          label: 'Status',
          render: obj => {
            let style = obj.status && obj.status.name === 'Active' ? 'success' : 'danger';
            return obj.status && <Badge style={style} type="blip">{obj.status.name}</Badge>;
          }
        }
    ];

    const tableActions = [
      {
        label: 'Edit',
        action: obj => {
          console.log(obj.stock)
        }
      }
    ];

    if(this.state.viewDetails) {
      return <Redirect to={'/product-orders/' + this.state.detailsId} push />
    }

    return (
      <Fragment>
        <TitleBar title="Product Orders" />
        <div className="container-fluid">
          <div className="form-group">
            <input type="text" className="form-control search-input" onChange={evt => this.filter(evt)} placeholder="Search" />
          </div>
          <Panel>
            <Table columns={columns} records={this.state.filteredOrders} actions={tableActions} onRowClick={this.onRowClick} />
          </Panel>
        </div>
      </Fragment>
    )
  }
}
