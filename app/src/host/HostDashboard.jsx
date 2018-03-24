import React, { Component } from 'react';
import Requests from '../requests/Requests';
import HostStyles from './host.style';

class HostDashboard extends Component {
  render() {
    const locations = [];

    return (
      <HostStyles>
        <h2>Host Dashboard</h2>
        <Requests
          explanation="Review requests for your locations"
          locations={locations}
        />
      </HostStyles>
    );
  }
}

export default HostDashboard;

