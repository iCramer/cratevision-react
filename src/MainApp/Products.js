import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { Filter } from '../Filter';
import { TitleBar, Panel, Badge } from '../components/core';
import { Table } from '../components/Table';
import API from '../services/api';

export class Products extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      filteredProducts: [],
      editId: null
    }
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    API.get('product/all').then(resp => {
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
        { label: 'Name',
          render: obj => <Link to={'/products/' + obj.id}>{obj.name}</Link>
        },
        { label: 'Stock', selector: 'stock' },
        { label: 'MSRP', selector: 'msrp' },
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
        icon: 'edit',
        clickHandler: obj => {
          this.setState({editId: obj.id});
        }
      }
    ];

    if(this.state.editId) {
      return <Redirect to={'/products/' + this.state.editId + '/edit'} push />
    }

    return (
      <Fragment>
        <TitleBar title="Products" />
        <div className="container-fluid">
          <div className="form-group">
            <input type="text" className="form-control search-input" onChange={evt => this.filter(evt)} placeholder="Search" />
          </div>
          <Panel accent="blue">
            <Table columns={columns} records={this.state.filteredProducts} actions={tableActions} />
          </Panel>
        </div>
      </Fragment>
    )
  }
}
