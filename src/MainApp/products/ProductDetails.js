import React, { Component, Fragment } from 'react';
import { Switch } from "react-router-dom";

import { ProductInfo } from './ProductInfo';
import { ProductItems } from './ProductItems';
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
      { route: `/products/${this.state.id}`, label: "Product" },
      { route: `/products/${this.state.id}/product-items`, label: "Product Items" }
    ];

    return (
      <Fragment>
        <TitleBar title="Product Details" links={tabLinks}></TitleBar>
        <div className="container-fluid">
          <Switch>
            <PrivateRoute exact path={'/products/' + this.state.id} render={ (props) => <ProductInfo productId={this.state.id} /> } />
            <PrivateRoute exact path={'/products/' + this.state.id + '/product-items'} render={ (props) => <ProductItems productId={this.state.id} /> } />
          </Switch>
        </div>
      </Fragment>
    )
  }
}
