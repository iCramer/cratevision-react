import React from 'react';

export const Select = ({label, options, value, name, ...props}) => {

  return (
    <div className="form-group">
      { label &&
        <label htmlFor={name}>{label}</label>
      }
      <select id={name} name={name} className="form-control" value={value || ''} type="text" {...props}>
        { options && options.map( (opt, index) => {
          return <option value={opt.value} key={`opt-${index}`}>{opt.label}</option>
        })}
      </select>
    </div>
  )
}
