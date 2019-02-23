import React, { Component, Fragment } from 'react';
import axios from 'axios'
import ReactTable from "react-table";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { TitleBar } from '../components/TitleBar';
import { Panel } from '../components/Panel';
import products from '../assets/data/product.json';

export class Products extends Component {
  constructor() {
    super();
    this.state = {
      products: products
    }
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    axios.get('http://bundlevo.com/src/product/productService.php?list=true')
    .then(response => {
      this.setState({ products: response || [] });
    }, error => {
      console.log(error)
    });
  }

  render() {
    const columns = [
      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'Stock',
        accessor: 'stock'
      },
      {
        Header: 'MSRP',
        accessor: 'msrp'
      },
      {
        Header: 'Actions',
        Cell: props => {
          return (
            <div>
              <button type="button"><FontAwesomeIcon icon="edit" /></button>
              <button type="button"><FontAwesomeIcon icon="trash-alt" /></button>
            </div>
          )
        }
      }
    ];

    return (
      <Fragment>
        <TitleBar title="Products" />
        <section className="container-fluid">
          <Panel>
          <ReactTable
            data={products}
            columns={columns}
          />
          </Panel>
        </section>
      </Fragment>
    )
  }
}
