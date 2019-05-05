import React from 'react';

export const Select = ({label, options, ...props}) => {

  return (
    <div className="form-group">
      { label &&
        <label>{label}</label>
      }
      <select className="form-control" type="text" {...props}>
        { options && options.map( (opt, index) => {
          return <option value={opt.value} key={`opt-${index}`}>{opt.label}</option>
        })}
      </select>
    </div>
  )
}
