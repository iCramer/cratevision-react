import React from 'react';
import classNames from 'classnames';

export const Panel = ({className, ...props}) => {
  let classSet = classNames('panel', className);
  return (
    <div className={classSet} {...props}>
      {props.children}
    </div>
  )
}
