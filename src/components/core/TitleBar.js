import React from 'react';
import { Link } from 'react-router-dom';

export const TitleBar = ({title, links, children, ...props}) => {
  return (
    <div className="title-bar container-fluid" {...props}>
      <div className="left-content">
        <h1 className="title">{title}</h1>
        { links &&
          <ul className="tabs">
            { links.map( (link, index) => {
              return (
                <li key={index} className="tab-item">
                  <Link to={link.route}>{link.label}</Link>
                </li>
              )
            })}
          </ul>
        }
      </div>
      <div className="right-content">
        {children}
      </div>
    </div>
  )
}
