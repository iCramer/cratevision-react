import React from 'react';

export const Input = ({label, textarea, ...props}) => {

  return (
    <div className="form-group">
      { label &&
        <label>{label}</label>
      }
      { textarea ?
        <textarea className="form-control" {...props}></textarea> :
        <input className="form-control" type="text" {...props} />
      }
    </div>
  )
}
