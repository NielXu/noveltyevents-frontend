import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import InlineEdit from './InlineEdit';
import './MemberDetailModal.css';

export default class MemberDetailModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
    }
  }

  handleClose = () => {
    this.props.setShow(false);
  }

  handleOnClickConfirmUpdate = () => {
    const data = JSON.parse(JSON.stringify(this.props.data));
    for(var key in data) {
      if(this.state.hasOwnProperty(key) && this.state[key]) {
        data[key] = this.state[key];
      }
    }
    this.props.onConfirmUpdate(data);
  }

  getData = (name, ifNotFound="") => {
    return this.props.data[name]? this.props.data[name] : ifNotFound;
  }

  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.handleClose}
        keyboard={false}
      >
        <Modal.Body>
          <span className="member-detail-modal-row">
            <h3>First name</h3>
            <InlineEdit
              text={this.getData("firstname")}
              permission={{
                req: "medium",
                permission: this.props.permission,
                placement: 'right'
              }}
              wrapperClassName="member-detail-modal-field"
              onChange={(text) => this.setState({ firstname: text })}
            />
          </span>
          <span className="member-detail-modal-row">
            <h3>Last name</h3>
            <InlineEdit
              text={this.getData("lastname")}
              wrapperClassName="member-detail-modal-field"
              permission={{
                req: "medium",
                permission: this.props.permission,
                placement: 'right'
              }}
              onChange={(text) => this.setState({ lastname: text })}
            />
          </span>
          <span className="member-detail-modal-row">
            <h3>Email</h3>
            <InlineEdit
              text={this.getData("email")}
              wrapperClassName="member-detail-modal-field"
              permission={{
                req: 'supreme',
                permission: this.props.permission,
                text: 'Email cannot be changed',
                placement: 'right'
              }}
            />
          </span>
          <span className="member-detail-modal-row">
            <h3>Card Number</h3>
            <InlineEdit
              text={this.getData("card")}
              wrapperClassName="member-detail-modal-field"
              permission={{
                req: 'supreme',
                permission: this.props.permission,
                text: 'Card number cannot be changed',
                placement: 'right'
              }}
            />
          </span>
          <span className="member-detail-modal-row">
            <h3>Join Date</h3>
            <InlineEdit
              text={this.getData("join")}
              wrapperClassName="member-detail-modal-field"
              permission={{
                req: 'supreme',
                permission: this.props.permission,
                text: 'Join date cannot be changed',
                placement: 'right'
              }}
            />
          </span>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.handleOnClickConfirmUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}