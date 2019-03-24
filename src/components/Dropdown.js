import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

export class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.state = { open: false };
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.onOutsideClick);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.onOutsideClick);
  }

  onOutsideClick = (evt) => {
    if(!this.node.contains(evt.target)) {
      this.setState({open: false});
    }
  }

  open = () => {
    this.setState({open: true});
  }

  getListClasses() {
    let position = this.props.position || '';
    const classes = classNames(
      'dropdown-list',
      'dropdown-' + position,
      { 'open': this.state.open }
    );

    return classes;
  }

  render() {
    return (
      <div className="dropdown">
        <button type="button" onClick={this.open} className="be-btn be-btn-link">
          { this.props.icon &&
            <FontAwesomeIcon icon={this.props.icon} />
          }
          { this.props.label &&
             this.props.label
          }
        </button>
        <div className={this.getListClasses()} ref={node => this.node = node}>
          <ul>
            { this.props.children &&
              this.props.children
            }
            { this.props.list && this.props.list.map( (item, index) => {
              return (
                <DropdownItem key={index} label={item.label} action={item.action} />
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}

export const DropdownItem = (props) => {
  return (
    <li className="dropdown-list-item">
      <button type="button" className="be-btn be-btn-link" onClick={props.action}>{props.label}</button>
    </li>
  )
}
