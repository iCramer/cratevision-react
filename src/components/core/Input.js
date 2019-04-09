import React from 'react';

export const Input = ({label, ...props}) => {

  return (
    <div className="form-group">
      <label>{label || ''}</label>
      <input
        className="form-control"
        type="text"
        {...props}
      />
    </div>
  )
}
