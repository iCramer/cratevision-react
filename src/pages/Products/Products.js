import React, { Component, Fragment } from 'react';
import axios from 'axios'

import { TitleBar } from '../../components/TitleBar/TitleBar';
import { Panel } from '../../components/Panel/Panel';

export class Products extends Component {
  constructor() {
    super();

    this.state = {
      products: []
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
    return (
      <Fragment>
        <TitleBar title="Products" />
        <section className="container-fluid">
          <Panel>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Stock</th>
                  <th>MSRP</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
              {this.state.products && this.state.products.map(product => {
                  return (
                    <tr>
                      <td>{product.name}</td>
                      <td>{product.stock}</td>
                      <td>{product.msrp}</td>
                      <td>{product.status}</td>
                      <td></td>
                    </tr>
                  )
                })
              }
              </tbody>
            </table>
          </Panel>
        </section>
      </Fragment>
    )
  }
}
