import React from 'react';
import classNames from 'classnames';

export const Panel = (props) => {
  let classSet = classNames('panel', props.className);
  return (
    <div className={classSet} {...props}>
      {props.children}
    </div>
  )
}
