import React from 'react';
import classNames from 'classnames';

export const Badge = ({children, style, type, className, ...props}) => {
  let classSet = classNames('badge', className, 'badge-' + style, 'badge-' + type);

  return (
    <span className={classSet} {...props}>{children}</span>
  )
}

Badge.defaultProps = {
  style: 'secondary',
  type: 'pill'
};
