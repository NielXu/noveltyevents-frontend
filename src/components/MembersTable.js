import React from 'react';
import { Dropdown } from 'react-bootstrap';
import Loader from './Loader';
import BootstrapTable from 'react-bootstrap-table-next';
import Permission from './Permission';
import { MEMBERS_MOCK_FACTORY as FACTORY } from '../tools';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './MembersTable.css';

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
    FACTORY.getDataDelay(2000, (result) => {
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
              rowClasses="row-wordbreak"
            />
          }
        />
      </div>
    )
  }
}