import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from './Button';

export const NoResults = ({header, body, icon, action, btnLabel, ...props}) => {

  return (
    <div className="no-results">
      { icon &&
        <FontAwesomeIcon className="no-results-icon" icon={icon} />
      }
      <h5 className="no-results-header">{header}</h5>
      { body &&
        <p className="no-results-body">{body}</p>
      }
      { action &&
        <Button btnStyle="secondary" onClick={action}>{btnLabel}</Button>
      }
    </div>
  )
}
