import React from 'react';

export const TitleBar = (props) => {
  return (
    <div className="title-bar container-fluid">
      <h1 className="title">{props.title}</h1>
      <div className="right-content">
        {props.children}
      </div>
    </div>
  )
}
