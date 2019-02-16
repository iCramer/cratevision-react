import React from 'react';

import './Panel.scss';

export const Panel = (props) => {
  return (
    <div className="panel">
      {props.children}
    </div>
  )
}
