import React, { Fragment } from 'react';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button } from './Button';

export const ListTitle = ({ children, editClick, ...props }) => {
  return (
    <h6 className="list-group-title" {...props}>
      {children}
      { editClick &&
        <Button linkBtn className="list-group-edit" size="xs" onClick={editClick} icon="edit" />
      }
    </h6>
  )
}

export const ListGroup = ({children, className, iconList, title, editClick, ...props}) => {
  let classSet = classnames('list-group', className, {'icon-list': iconList});
  return (
    <Fragment>
      { title &&
        <ListTitle editClick={editClick}>{title}</ListTitle>
      }
      <ul className={classSet} {...props}>
        {children}
      </ul>
    </Fragment>
  )
}

export const ListGroupItem = ({children, icon, color, className, justifyContent, ...props}) => {
  let classSetLi = classnames(
    'list-group-item',
    className,
    {
      'justify-content-between': justifyContent,
      'flex-column align-items-start': !justifyContent,
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
  color: 'blue',
  justifyContent: true
}
