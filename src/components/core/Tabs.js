import React from 'react';
import { NavLink } from 'react-router-dom';

export const Tabs = (props) => {
  return (
    <ul className="tabs">
      { props.links.map( (link, index) => {
        return (
          <li key={index} className="tab-item">
            <NavLink className="tab-link" to={link.route}>{link.label}</NavLink>
          </li>
        )
      })}
    </ul>
  )
}
