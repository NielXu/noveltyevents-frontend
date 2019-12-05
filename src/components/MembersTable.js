import React from 'react';
import { Dropdown } from 'react-bootstrap';
import Loader from './Loader';
import BootstrapTable from 'react-bootstrap-table-next';
import Permission from './Permission';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

export default class MembersTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
    }
  }

  optionFormatter = (cell, row, rowIndex, extra) => {
    return (
      <Dropdown>
          <Dropdown.Toggle variant="info" id="dropdown-basic">
            More
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Permission
              req="medium"
              permission={this.props.permission}
              component={
                <Dropdown.Item href="#/action-1" value={row.id}>Update</Dropdown.Item>
              }
            />
            <Permission
              req="low"
              permission={this.props.permission}
              component={
                <Dropdown.Item href="#/action-2" value={row.id}>Contact</Dropdown.Item>
              }
            />
            <Dropdown.Divider />
            <Permission
              req="high"
              permission={this.props.permission}
              component={
                <Dropdown.Item href="#/action-3" value={row.id}>Delete</Dropdown.Item>
              }
            />
          </Dropdown.Menu>
      </Dropdown>
    )
  }

  componentDidMount() {
    // Mock API fetch
    setTimeout(() => {
      this.setState({
        loading: false,
        data: [{
          id: "asdo9123",
          username: "nielxu",
          firstname: 'Daniel',
          lastname: 'Xu',
          email: '123@a.com',
          join: '2019-10-10'
        }]
      },)
    }, 3000);
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
      dataField: 'join',
      text: 'Join'
    }, {
      dataField: 'id',
      text: '',
      formatter: this.optionFormatter
    }];

    return (
      <div>
        <Loader
          loading={this.state.loading}
          component={
            <BootstrapTable
              keyField='id'
              data={this.state.data}
              columns={columns}
            />
          }
        />
      </div>
    )
  }
}