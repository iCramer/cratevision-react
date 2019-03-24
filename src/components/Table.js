import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Dropdown, DropdownItem } from './Dropdown';

export class Table extends Component {
  constructor(props) {
    super(props);
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
              <tr key={index}>
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
          })
        }
        </tbody>
      </table>
    )
  }
}
