import React from 'react';
import { Switch } from 'react-router-dom';
import UnauthenticatedRoute from './components/UnauthenticatedRoute';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import Login from './containers/Login';
import MemberLanding from './containers/MemberLanding';
import AdminLanding from './containers/AdminLanding';
import AdminEvent from './containers/AdminEvents.js';
import AdminMembers from './containers/AdminMembers';
import PastEvents from './containers/PastEvents';

export default ({ childProps }) => 
  <Switch>
    <AuthenticatedRoute exact path="/member" component={MemberLanding} props={childProps} role="member" />
    <AuthenticatedRoute exact path="/admin" component={AdminLanding} props={childProps} role="admin" />
    <AuthenticatedRoute exact path="/admin/events" component={AdminEvent} props={childProps} role="admin" />
    <AuthenticatedRoute exact path="/admin/members" component={AdminMembers} props={childProps} role="admin" />
    <UnauthenticatedRoute exact path="/events" component={PastEvents} props={childProps} />
    <UnauthenticatedRoute path="/" component={Login} props={childProps} />
  </Switch>