import React from 'react';
import classnames from 'classnames';

export const Badge = ({children, style, type, className, ...props}) => {
  let classSet = classnames('badge', className, 'badge-' + style, 'badge-' + type);

  return (
    <span className={classSet} {...props}>{children}</span>
  )
}

Badge.defaultProps = {
  style: 'secondary',
  type: 'pill'
};
