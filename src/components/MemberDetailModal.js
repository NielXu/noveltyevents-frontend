import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import InlineEdit from './InlineEdit';
import './MemberDetailModal.css';

export default class MemberDetailModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  handleClose = () => {
    this.props.setShow(false);
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
            <label>First name</label>
            <InlineEdit
              text={this.getData("firstname")}
              wrapperClassName="member-detail-modal-field"
            />
          </span>
          <span className="member-detail-modal-row">
            <label>Last name</label>
            <InlineEdit
              text={this.getData("lastname")}
              wrapperClassName="member-detail-modal-field"
            />
          </span>
          <span className="member-detail-modal-row">
            <label>Email</label>
            <InlineEdit
              text={this.getData("email")}
              wrapperClassName="member-detail-modal-field"
            />
          </span>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}