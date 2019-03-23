import React, { Component, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Filter } from '../Filter';
import { TitleBar } from '../components/TitleBar';
import { Panel } from '../components/Panel';
import { Table } from '../components/Table';
import HttpService from '../services/HttpService';

export class Products extends Component {
  http = new HttpService();

  constructor() {
    super();
    this.state = {
      products: [],
      filteredProducts: []
    }
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    this.http.get('product/all').then(resp => {
      this.setState({ products: resp.data || [], filteredProducts: resp.data });
    }).catch(error => {
      console.log(error.response)
    });
  }

  filter(evt) {
    const data = Filter([{field: 'all', value: evt.target.value}], this.state.products);
    this.setState({filteredProducts: data});
  }

  render() {
    const columns = [
        { label: 'Name', selector: 'name' },
        { label: 'Stock', selector: 'stock' },
        { label: 'MSRP', selector: 'msrp' },
        {
          label: 'Status',
          render: obj => {
            return <span className="badge badge-primary">{obj.status.name}</span>
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

    return (
      <Fragment>
        <TitleBar title="Products" />
        <section className="container-fluid">
          <div className="form-group">
            <input type="text" className="form-control search-input" onChange={evt => this.filter(evt)} placeholder="Search" />
          </div>
          <Panel>
            <Table columns={columns} records={this.state.filteredProducts} actions={tableActions} />
          </Panel>
        </section>
      </Fragment>
    )
  }
}
