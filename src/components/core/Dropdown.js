import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';

import { Button } from './Button';

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
    const classes = classnames(
      'dropdown-list',
      'dropdown-' + position,
      { 'open': this.state.open }
    );

    return classes;
  }

  render() {
    return (
      <div className="dropdown">
        <Button onClick={this.open} linkBtn icon={this.props.icon}>
          { this.props.label &&
             this.props.label
          }
        </Button>
        <div className={this.getListClasses()} ref={node => this.node = node}>
          <ul>
            { this.props.children &&
              this.props.children
            }
            { this.props.list && this.props.list.map( (item, index) => {
              return (
                <DropdownItem key={index} label={item.label} clickHandler={item.clickHandler} />
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
      <Button linkBtn onClick={props.clickHandler}>{props.label}</Button>
    </li>
  )
}
