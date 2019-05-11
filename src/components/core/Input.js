import React from 'react';

export const Input = ({label, value, name, textarea, ...props}) => {

  return (
    <div className="form-group">
      { label &&
        <label htmlFor={name}>{label}</label>
      }
      { textarea ?
        <textarea id={name} name={name} className="form-control" value={value || ''} {...props}></textarea> :
        <input id={name} name={name} className="form-control" type="text" value={value || ''} {...props} />
      }
    </div>
  )
}
