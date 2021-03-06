import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Dropdown, DropdownItem } from './Dropdown';
import { TableRow } from './TableRow';

export class Table extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <table className="be-table">
        <thead>
          <tr>
            { this.props.columns && this.props.columns.map( column => {
                return <th key={column.label + '-header'}>{column.label}</th>
              })
            }
            { this.props.actions &&
                <th>Actions</th>
            }
          </tr>
        </thead>
        <tbody>
        {this.props.records && this.props.records.map((obj, index) => {
            return (
              <TableRow
                record={obj}
                key={index}
                index={index}
                columns={this.props.columns}
                onRowClick={this.props.onRowClick}
                actions={this.props.actions}
              />
            )
          })
        }
        </tbody>
      </table>
    )
  }
}
