import React from 'react';

export default class AdminLanding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }

  render() {
    return (
      <div>
        Admin landing page
      </div>
    )
  }
}