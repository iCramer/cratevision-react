import React from 'react';
import classNames from 'classnames';

export const Block = ({title, metaTag, className, ...props}) => {
  let classSet = classNames('block', className);
  return (
    <div className={classSet} {...props}>
      <h5 className="block-title">{title}</h5>
      <p className="block-body">{props.children}</p>
    </div>
  )
}
