import React from 'react';
import Loader from './Loader';
import BootstrapTable from 'react-bootstrap-table-next';
import MemberDetailModal from './MemberDetailModal';
import { MEMBERS_MOCK_FACTORY as FACTORY } from '../tools';
import Alert from 'react-bootstrap-sweetalert';
import LoadingOverlay from 'react-loading-overlay';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './MembersTable.css';

export default class MembersTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updating: false,
      loading: true,
      data: [],
      showDeleteConfirm: false,
      pendingDeletion: '',
      showMemberDetailModal: false,
      memberDetail: '',
    }
  }

  setShowMemberDetailModal = (show) => {
    this.setState({ showMemberDetailModal: show });
  }

  handleUpdateConfirm = (data) => {
    this.setState({ updating: true, showMemberDetailModal: false });
    // The data is updated but the table is not rerendering, this
    // might due to the shouldComponentUpdate implementation
    FACTORY.update({name: "id", value: data.id}, data, 500, (updated) => {
      const newData = this.state.data.map((item) => {
        if(updated.id === item.id) {
          return updated;
        }
        return item;
      });
      this.setState({ data: newData, updating: false });
    });
  }

  handleConfirmDeleteMember = () => {
    this.setState({ showDeleteConfirm: false, updating: true });
    FACTORY.delete({name: "id", value: this.state.pendingDeletion}, 1000, () => {
      this.setState({ updating: false });
    });
  }

  componentDidMount() {
    // Mock API fetch
    FACTORY.getDataDelay(1000, (result) => {
      this.setState({
        loading: false,
        data: result,
      })
    });
  }

  render() {
    const columns = [{
      dataField: 'firstname',
      text: 'First Name'
    }, {
      dataField: 'lastname',
      text: 'Last Name'
    }, {
      dataField: 'email',
      text: 'Email'
    }, {
      dataField: 'card',
      text: 'Card Number'
    }, {
      dataField: 'join',
      text: 'Join'
    }, {
      dataField: 'id',
      text: '',
      hidden: true
    }];

    const rowEvents = {
      onClick: (e, row, rowIndex) => {
        this.setState({ showMemberDetailModal: true, memberDetail: row });
      }
    }

    return (
      <div>
        <LoadingOverlay
          active={this.state.updating}
          spinner
          text="Updating ..."
        >
          <Loader
            loading={this.state.loading}
            component={
              <BootstrapTable
                keyField='id'
                data={this.state.data}
                columns={columns}
                rowClasses="row-wordbreak members-table-row"
                rowEvents={rowEvents}
              />
            }
          />
        </LoadingOverlay>
        <MemberDetailModal
          show={this.state.showMemberDetailModal}
          setShow={this.setShowMemberDetailModal}
          data={this.state.memberDetail}
          permission={this.props.permission}
          onConfirmUpdate={this.handleUpdateConfirm}
        />
        <Alert
          warning
          showCancel
          confirmBtnText="Yes, delete it"
          confirmBtnBsStyle="danger"
          title="Deleting member"
          onConfirm={this.handleConfirmDeleteMember}
          onCancel={() => this.setState({ showDeleteConfirm: false })}
          focusCancelBtn
          show={this.state.showDeleteConfirm}
        >
          Are you sure to delete this member?
        </Alert>
      </div>
    )
  }
}