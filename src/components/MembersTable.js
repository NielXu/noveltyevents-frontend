import React from 'react';
import Loader from './Loader';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

export default class MembersTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
    }
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
      dataField: 'id',
      text: 'ID',
      hidden: true,
    }, {
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