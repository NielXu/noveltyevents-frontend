import React from 'react';
import { withRouter } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { auth, logout } from './tools';
import Routes from './Routes';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
      userRole: '',
      userPermission: '',
    }
  }

  componentDidMount() {
    // Mock Auth, hard coded user role and permission level
    const authResult = auth('admin', 'high');
    if(authResult.result) {
      this.userHasAuthenticated(true);
      this.setUserPermission(authResult.permission);
      this.setUserRole(authResult.role);
    }
  }
  
  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  setUserRole = role => {
    this.setState({ userRole: role });
  }

  setUserPermission = permission => {
    this.setState({ userPermission: permission });
  }

  handleLogout = () => {
    this.setState({
      isAuthenticated: false,
      userPermission: '',
      userRole: '',
    })
    logout();
    this.props.history.push("/");
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
      userRole: this.state.userRole,
      setUserRole: this.setUserRole,
      userPermission: this.state.userPermission,
      setUserPermission: this.setUserPermission,
    };

    return (
      <div className="full-height full-width">
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
                          <Nav.Link className="mr-auto" href="/member/events">Events</Nav.Link>
                          <Nav.Link className="mr-auto" href="/member/feedback">Feedback</Nav.Link>
                        </>
                      : <>
                          <Nav.Link className="mr-auto" href="/admin/events">Events</Nav.Link>
                          <Nav.Link className="mr-auto" href="/admin/members">Members</Nav.Link>
                          <Nav.Link className="mr-auto" href="/admin/stat">Stat</Nav.Link>
                          <Nav.Link className="mr-auto" href="/admin/feedback">Feedback</Nav.Link>
                        </>
                    }
                  </>
                : <>
                    <Nav.Link href="/events">Events</Nav.Link>
                    <Nav.Link href="/about">About</Nav.Link>
                  </>
              }
            </Nav>
            <Nav>
              {this.state.isAuthenticated
                && <Nav.Link className="mr-auto" onClick={this.handleLogout}>Logout</Nav.Link>
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
