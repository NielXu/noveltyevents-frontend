import React from 'react';
import { Form, Alert, Container, Row, Col } from 'react-bootstrap';
import LoaderButton from '../components/LoaderButton';
import './Login.css';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        loading: false,
        loggingIn: false,
        loginError: '',
        email: '',
        password: '',
        roleAsMember: true,
    }
  }

  onLoginFormSubmit = event => {
    event.preventDefault();
    this.setState({ loggingIn: true, loginError: '' });
    // Mock login request
    setTimeout(() => {
      if(this.state.email === '123@a.com' && this.state.password === '123') {
        this.props.setUserRole(this.state.roleAsMember? 'member' : 'admin');
        this.props.setUserPermission('high');
        this.props.userHasAuthenticated(true);
      }
      else {
        this.setState({ loginError: 'Incorrect username or password', loggingIn: false });
      }
    }, 600);
  }

  validateForm() {
    return this.state.email !== '' && this.state.password !== '';
  }

  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col>{/* This is an empty col */}</Col>
            <Col md={3}>
            <Form onSubmit={this.onLoginFormSubmit} className="center-text login-box">
              <h3 className="login-title">Novelty Login</h3>
              <Form.Group controlId="email">
                <Form.Control
                  autoFocus
                  placeholder="Email"
                  type="email"
                  onChange={e => this.setState({ email: e.target.value })}
                  value={this.state.email}
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={e => this.setState({ password: e.target.value })}
                  value={this.state.password}
                />
              </Form.Group>
              <Form.Group>
                <Row>
                  <Col>
                    <Form.Check
                      label="Member"
                      checked={this.state.roleAsMember}
                      onChange={e => this.setState({ roleAsMember: e.target.checked })}
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      label="Admin"
                      checked={!this.state.roleAsMember}
                      onChange={e => this.setState({ roleAsMember: !e.target.checked })}
                    />
                  </Col>
                </Row>
              </Form.Group>
              <LoaderButton
                loading={this.state.loggingIn}
                type="submit"
                text="Login"
                loadingText="Logging in ..."
                disabled={!this.validateForm()}
                className="login-loader-button"
              />
              </Form>
            </Col>
            <Col>{/* This is an empty col */}</Col>
          </Row>
          {this.state.loginError &&
            <Alert
              variant="danger"
              dismissible
              onClose={e => this.setState({ loginError: '' })}
              className="alert-message"
            >
              {this.state.loginError}
            </Alert>
          }
        </Container>
      </div>
    );
  }
}