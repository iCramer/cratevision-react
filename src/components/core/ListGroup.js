import React from 'react';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ListGroup = ({children, className, iconList, ...props}) => {
  let classSet = classnames('list-group', className, {'icon-list': iconList});
  return (
    <ul className={classSet} {...props}>
      {children}
    </ul>
  )
}

export const ListGroupItem = ({children, icon, color, className, justifyContent, ...props}) => {
  let classSetLi = classnames(
    'list-group-item',
    className,
    {
      'justify-content-between': justifyContent,
      'd-flex': justifyContent,
      'item-prefixed': icon
    }
  );

  let classSetSpan = classnames(
    'list-item-prefix',
    {
      [color]: color
    }
  );

  return (
    <li className={classSetLi} {...props}>
      {icon &&
        <span className={classSetSpan}>
          <FontAwesomeIcon icon={icon} />
        </span>
      }
      {children}
    </li>
  )
}

ListGroupItem.defaultProps = {
  color: 'blue'
}
