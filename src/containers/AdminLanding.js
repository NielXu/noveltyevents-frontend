import React from 'react';

export default class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
    console.log(this.props);
  }

  render() {
    return <h2>Admin Landing page</h2>
  }
}