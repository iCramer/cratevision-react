import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button } from './Button';

export const CounterInput = ({label, value, onChange, max, ...props}) => {
  let getInputClass = () => {
    return value > 0 ? 'has-count' : null;
  }

  let getValue = () => {
    if(value === '' || isNaN(value)) {
      return 0;
    }
    else {
      return parseInt(value);
    }
  }

  return (
    <div className="counter-input">
      {label &&
        <label>{label}</label>
      }
      <Button linkBtn onClick={onChange} size="sm" value={getValue() - 1} disabled={getValue() <= 0} icon="chevron-left" />
      <input type="number" className={getInputClass()} onChange={onChange} value={value} {...props} max={max} />
      <Button linkBtn onClick={onChange} size="sm" value={getValue() + 1} disabled={getValue() === parseInt(max)} icon="chevron-right" />
    </div>
  )
}
