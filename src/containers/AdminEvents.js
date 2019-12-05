import React from 'react';
import './AdminEvents.css';
import Loader from '../components/Loader';

export default class AdminEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    }
  }

  componentDidMount() {
    // Mock API call
    setTimeout(() => {
      this.setState({ loading: false });
    }, 3000);
  }

  render() {
    return (
      <div>
        <Loader
          loading={this.state.loading}
          component={
            <div>Admin events page</div>
          }
        />
      </div>
    )
  }
}