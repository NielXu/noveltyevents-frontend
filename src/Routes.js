import React from 'react';
import { Route, Switch } from 'react-router-dom';
import UnauthenticatedRoute from './components/UnauthenticatedRoute';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import Login from './containers/Login';
import MemberLanding from './containers/MemberLanding';
import AdminLanding from './containers/AdminLanding';

export default ({ childProps }) => 
  <Switch>
    <AuthenticatedRoute exact path="/member" component={MemberLanding} props={childProps} />
    <AuthenticatedRoute exact path="/admin" component={AdminLanding} props={childProps} />
    <UnauthenticatedRoute path="/" component={Login} props={childProps} />
  </Switch>