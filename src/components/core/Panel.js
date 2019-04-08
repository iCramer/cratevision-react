import React from 'react';
import classnames from 'classnames';

export const Panel = ({className, title, accent, ...props}) => {
  const classSet = classnames('panel', className, {[accent]: accent});
  return (
    <div className={classSet} {...props}>
      {title &&
        <header className="panel-header">
          <h5>{title}</h5>
        </header>
      }
      <div className="panel-body">
        {props.children}
      </div>
    </div>
  )
}