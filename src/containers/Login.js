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
        this.props.userHasAuthenticated(true);
      }
      else {
        this.setState({ loginError: 'Incorrect username or password', loggingIn: false });
      }
    }, 2000);
  }

  validateForm() {
    return this.state.email !== '' && this.state.password !== '';
  }

  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col>
              {/* This is empty col */}
            </Col>
            <Col>
            <Form onSubmit={this.onLoginFormSubmit} className="center-text">
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
                <Form.Check
                  label="Member"
                  checked={this.state.roleAsMember}
                  onChange={e => this.setState({ roleAsMember: e.target.checked })}
                  />
                <Form.Check
                  label="Admin"
                  checked={!this.state.roleAsMember}
                  onChange={e => this.setState({ roleAsMember: !e.target.checked })}
                />
              </Form.Group>
              <LoaderButton
                loading={this.state.loggingIn}
                type="submit"
                text="Login"
                loadingText="Logging in ..."
                disabled={!this.validateForm()}
              />
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
              </Form>
            </Col>
            <Col>
              {/* This is empty col */}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}