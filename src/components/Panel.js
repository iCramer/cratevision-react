import React from 'react';
import classNames from 'classnames';

export const Panel = ({className, title, accent, ...props}) => {
  const classSet = classNames('panel', className, {[accent]: accent});
  return (
    <div className={classSet} {...props}>
      <header className="panel-header">
        <h5>{title}</h5>
      </header>
      <div className="panel-body">
        {props.children}
      </div>
    </div>
  )
}
