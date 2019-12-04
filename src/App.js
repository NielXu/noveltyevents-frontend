import React from 'react';
import { withRouter } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
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
        <Navbar bg="light" variant="light">
          <Navbar.Brand href="/">
            Novelty UTSC
          </Navbar.Brand>
          <Navbar.Collapse>
            <Nav className="mr-auto">
              {this.state.isAuthenticated
                ? <>
                    {this.state.userRole === 'member'
                      ? <>
                          <Nav.Link className="mr-auto">Events</Nav.Link>
                          <Nav.Link className="mr-auto">Suggestions</Nav.Link>
                        </>
                      : <>
                          <Nav.Link className="mr-auto">Events</Nav.Link>
                          <Nav.Link className="mr-auto">Members</Nav.Link>
                          <Nav.Link className="mr-auto">Stat</Nav.Link>
                        </>
                    }
                  </>
                : <>
                    <Nav.Link href="#events">Events</Nav.Link>
                    <Nav.Link href="#about">About</Nav.Link>
                  </>
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes childProps={ childProps }/>
      </div>
    );
  }
}

export default withRouter(App);
