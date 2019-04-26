import React from 'react';
import classnames from 'classnames';

export const Panel = ({className, title, accent, sticky, utility, ...props}) => {
  const classSet = classnames(
    'panel',
    className,
    {
      [accent]: accent,
      'panel-sticky': sticky
    }
  );

  return (
    <div className={classSet} {...props}>
      {title &&
        <header className="panel-header">
          <h5 className="panel-title">{title}</h5>
          { utility &&
            <div className="panel-utility">
              {utility}
            </div>
          }
        </header>
      }
      <div className="panel-body">
        {props.children}
      </div>
    </div>
  )
}
