import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import { Tabs } from './Tabs';

export const TitleBar = ({title, links, children, ...props}) => {
  const classSet = classnames('title-bar', 'container-fluid', { 'title-bar-nav': links });

  return (
    <div className={classSet} {...props}>
      <div className="left-content">
        <h1 className="title">{title}</h1>
        { links &&
          <Tabs links={links} />
        }
      </div>
      <div className="right-content">
        {children}
      </div>
    </div>
  )
}
