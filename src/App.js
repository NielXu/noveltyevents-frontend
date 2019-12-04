import React from 'react';
import { withRouter } from 'react-router-dom';
import Routes from './Routes';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
      userRole: '',
    }
  }
  
  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  setUserRole = role => {
    this.setState({ userRole: role });
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
      userRole: this.state.userRole,
      setUserRole: this.setUserRole,
    };

    return (
      <div>
        <Routes childProps={ childProps }/>
      </div>
    );
  }
}

export default withRouter(App);
