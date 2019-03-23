import React from 'react';

export const TitleBar = (props) => {
  return (
    <div className="title-bar container-fluid">
      <h2 className="title">{props.title}</h2>
      <div className="right-content">
        {props.children}
      </div>
    </div>
  )
}
