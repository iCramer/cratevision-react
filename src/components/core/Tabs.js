import React from 'react';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';

export const Tabs = (props) => {
  return (
    <ul className="tabs">
      { props.links.map( (link, index) => {
        let active = link.tabKey === props.activeTab;
        return (
          <li key={index} className="tab-item">
            <Tab id={'tab-' + index} active={active} tabKey={link.tabKey} clickHandler={props.clickHandler} route={link.route || null}>{link.label}</Tab>
          </li>
        )
      })}
    </ul>
  )
}

export const Tab = ({children, route, active, clickHandler, tabKey, ...props}) => {
  if (route) {
    return <NavLink {...props} className="tab-link" onClick={clickHandler} to={route}>{children}</NavLink>
  }
  else {
    const classSet = classnames('tab-link', {active: active});
    return <button type="button" onClick={(evt) => clickHandler(tabKey, evt)} className={classSet} {...props}>{children}</button>
  }
}
