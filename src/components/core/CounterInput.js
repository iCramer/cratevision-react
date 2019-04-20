import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button } from './Button';

export const CounterInput = ({label, value, onChange, max, ...props}) => {
  let getInputClass = () => {
    if(value > 0) {
      return 'has-count';
    }
    return null;
  }

  return (
    <div className="counter-input">
      {label &&
        <label>{label}</label>
      }
      <Button linkBtn onClick={onChange} size="sm" value={parseInt(value) - 1} disabled={value <= 0} icon="chevron-left" />
      <input type="number" className={getInputClass()} onChange={onChange} value={value} {...props} max={max} />
      <Button linkBtn onClick={onChange} size="sm" value={parseInt(value) + 1} disabled={value === max} icon="chevron-right" />
    </div>
  )
}
