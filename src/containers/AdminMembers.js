import React from 'react';
import MemberTable from '../components/MembersTable';

export default class AdminMembers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  render() {
    return (
      <div>
        <MemberTable permission={this.props.userPermission}/>
      </div>
    )
  }
}