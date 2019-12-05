import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import NoAccess from '../containers/NoAccess';

export default ({ component: C, props: cProps, role: R, ...rest }) =>
  <Route
    {...rest}
    render={props => 
      cProps.isAuthenticated
      ? <>
          {cProps.userRole === R
            ? <C {...props} {...cProps} />
            : <NoAccess />
          }
        </>
      : <Redirect to={`/login?redirect=${props.location.pathname}${props.location.search}`}/>
    }
  />