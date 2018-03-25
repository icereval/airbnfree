import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HostStyles from './host.style';
import Requests from '../requests/Requests';
import Locations from '../locations/Locations';
import SmallLoader from '../loading/SmallLoader';
import * as LocationsActions from '../locations/locationsActions';
import * as RequestActions from '../requests/requestActions';

class HostDashboard extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      requestsLoaded: false,
    };

    this.acceptRequest = this.acceptRequest.bind(this);
    this.denyRequest = this.denyRequest.bind(this);
  }

  componentDidMount() {
    this.props.getLocations();
  }

  componentWillReceiveProps(nextProps) {
    if (Object.keys(nextProps.user.loaded).length > 0
      && !this.state.requestsLoaded) {
      this.props.getHostStays(nextProps.user.loaded.host.id);
      this.setState({ requestsLoaded: true });
    }
  }

  acceptRequest(id) {
    this.props.changeStayState(id, 'host-approved');
  }

  denyRequest(id) {
    this.props.changeStayState(id, 'host-denied');
  }

  render() {
    const {
      locations,
      user,
      requests,
    } = this.props;
    const locationsLoading = locations.loading ||
      locations.loaded.length <= 0;
    const hostLocations = locations.loaded.length <= 0 ? [] :
      locations.loaded
        .filter(location => location.host.id === user.loaded.id)
        .map(location => location);

    return (
      <HostStyles>
        <Requests
          title="Review requests for your locations"
          stays={requests.hostStays}
          requestAction={this.acceptRequest}
          denyAction={this.denyRequest}
        />
        {locationsLoading ? <SmallLoader /> :
        <Locations
          title="Your locations"
          locations={hostLocations}
        />}
      </HostStyles>
    );
  }
}

HostDashboard.propTypes = {
  user: PropTypes.shape({
    loaded: PropTypes.shape({
      host: PropTypes.shape({
        id: PropTypes.number,
      }),
    }),
  }).isRequired,
  locations: PropTypes.shape({
    loading: PropTypes.bool,
    loaded: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  requests: PropTypes.shape({
    hostStays: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  getLocations: PropTypes.func.isRequired,
  getHostStays: PropTypes.func.isRequired,
  changeStayState: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user,
    locations: state.locations,
    requests: state.requests,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign(
    {},
    LocationsActions,
    RequestActions,
  ), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HostDashboard);

