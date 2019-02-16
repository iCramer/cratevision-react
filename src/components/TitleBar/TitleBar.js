import React from 'react';

import './TitleBar.scss';

export const TitleBar = (props) => {
  return (
    <div className="title-bar container-fluid">
      <h1>{props.title}</h1>
    </div>
  )
}
