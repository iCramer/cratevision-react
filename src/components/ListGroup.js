import React from 'react';
import classNames from 'classnames';

export const ListGroup = ({children, className, ...props}) => {
  let classSet = classNames('list-group', className);
  return (
    <ul className={classSet} {...props}>
      {children}
    </ul>
  )
}

export const ListGroupItem = ({children, className, justifyContent, ...props}) => {
  let classSet = classNames(
    'list-group-item',
    className,
    {
      'd-flex': justifyContent,
      'justify-content-between': justifyContent
    }
  );
  return (
    <li className={classSet} {...props}>
      {children}
    </li>
  )
}
