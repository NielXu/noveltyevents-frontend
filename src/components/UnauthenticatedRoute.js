import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { queryString } from '../tools/url.tools';

export default ({ component: C, props: cProps, ...rest }) => {
  const redirect = queryString("redirect");
  return (
    <Route
      {...rest}
      render={props => 
        !cProps.isAuthenticated
          ? <C {...props} {...cProps} /> 
          : <Redirect to={redirect === "" || redirect === null? "/" : redirect}/>
      }
    />
  )
}