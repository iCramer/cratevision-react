import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';

import { Dropdown, DropdownItem } from './core';

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
          <Dropdown position="bottom-left" icon="cog">
          { this.props.actions && this.props.actions.map( action => {
            return (
              <DropdownItem key={action.label + index} label={action.label} action={(evt) => action.action(obj, evt)} />
            )
          })}
          </Dropdown>
        </td>
      }
      </tr>
    )
  }
}
