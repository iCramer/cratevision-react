import React, { Component, Fragment } from 'react';
import { Switch } from "react-router-dom";

import { ProductInfo } from './ProductInfo';
import { ProductItems } from './ProductItems';
import { EditProduct } from '../EditProduct';
import { TitleBar, Panel, Button, ListGroup, ListGroupItem, Badge, Block, PrivateRoute } from '../../components/core';
import { Table } from '../../components/Table';
import API from '../../services/api';

import { Doughnut } from 'react-chartjs-2';

export class ProductDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
    }
  }

  render() {
    const tabLinks = [
      { route: '/products/' + this.state.id + '/product-info', label: "Product Info" },
      { route: '/products/' + this.state.id + '/product-items', label: "Product Items" }
    ];

    return (
      <Fragment>
        <TitleBar title="Product Details" links={tabLinks}></TitleBar>
        <div className="container-fluid">
          <Switch>
            <PrivateRoute path="/products/:id/product-info" component={ ProductInfo } />
            <PrivateRoute exact path="/products/:id/product-items" component={ ProductItems } />
            <PrivateRoute exact path="/products/:id/edit" component={ EditProduct } />
          </Switch>
        </div>
      </Fragment>
    )
  }
}
