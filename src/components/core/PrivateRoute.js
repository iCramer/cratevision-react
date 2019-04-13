import React from 'react';
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({ component, render, ...rest }) => {
  if (!localStorage.getItem('jwt')) {
    return (
      <Route {...rest} render={ (props) => <Redirect to={{ pathname: '/auth/login', state: { from: props.location } }} /> } />
    )
  }
  else {
    return <RouteRender component={component} render={render} {...rest} />
  }
}

const RouteRender = ({ component: Component, render, ...rest }) => {
  if (render) {
    return <Route {...rest} render={render} />
  }
  else {
    return <Route {...rest} render={ (props) => <Component {...props} /> } />
  }
}
