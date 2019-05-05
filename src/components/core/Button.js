import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';

export const Button = ({children, icon, route, btnStyle, size, linkBtn, className, centered, ...props}) => {
  const classSet = classnames(
    'btn',
    `btn-${btnStyle}`,
    `btn-${size}`,
    className,
    {
      'btn-link': linkBtn,
      'btn-centered': centered,
      'icon-with-text': icon && children
    }
  );

  let getIcon = () => {
    if(!icon) {
      return null;
    }
    return <FontAwesomeIcon className="btn-icon" icon={icon} />;
  }

  let button;
  if(route) {
    button = <Link to={route} className={classSet} {...props}>{getIcon()}{children}</Link>
  }
  else {
    button = <button type="button" className={classSet} {...props}>{getIcon()}{children}</button>
  }

  return button;
}

Button.defaultProps = {
  btnStyle: 'primary',
  size: 'md'
}
