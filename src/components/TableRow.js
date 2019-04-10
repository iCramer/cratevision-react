import React, { Component } from 'react';
import classnames from 'classnames';

import { Button } from './core';

export class TableRow extends Component {
  constructor(props) {
    super(props);
  }

  getClassSet() {
    return classnames({
      'row-clickable': this.props.onRowClick
    });
  }

  getCellValue(obj, selector) {
    let selectors = selector.split('.');
    let value = obj[selectors[0]];

    if(selectors.length > 1) {
      let lastValue;
      selectors.forEach( (sel, i) => {
        if(i === 0) {
          lastValue = value;
        }
        else {
          value = lastValue[sel];
        }
      });
    }

    return value;
  }

  getRowClick(obj, evt) {
    let click = null
    if(this.props.onRowClick) {
      click = this.props.onRowClick(obj, evt);
    }

    return click;
  };

  render() {
    const obj = this.props.record;
    const index = this.props.index;

    return (
      <tr onClick={(evt) => this.getRowClick(obj, evt)} className={this.getClassSet()}>
      { this.props.columns && this.props.columns.map( column => {
          return (
            <td key={column.label + index}>
            { column.render ? column.render(obj) : this.getCellValue(obj, column.selector) }
            </td>
          )
        })
      }
      { this.props.actions &&
        <td>
          { this.props.actions && this.props.actions.map( action => {
            return (
              <Button icon={action.icon} linkBtn size="xs" key={action.label + index} onClick={(evt) => action.clickHandler(obj, evt)} />
            )
          })}
        </td>
      }
      </tr>
    )
  }
}
