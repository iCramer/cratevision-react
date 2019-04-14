import React from 'react';
import classnames from 'classnames';

export const Badge = ({children, badgeStyle, badgeType, className, ...props}) => {
  let classSet = classnames('badge', className, 'badge-' + badgeStyle, 'badge-' + badgeType);

  return (
    <span className={classSet} {...props}>{children}</span>
  )
}

Badge.defaultProps = {
  badgeStyle: 'secondary',
  badgeType: 'pill'
};
