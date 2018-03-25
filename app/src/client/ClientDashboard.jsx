import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ClientStyles from './client.style';
import Requests from '../requests/Requests';
import Locations from '../locations/Locations';
import SmallLoader from '../loading/SmallLoader';
import * as LocationsActions from '../locations/locationsActions';
import * as RequestActions from '../requests/requestActions';

class ClientDashboard extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      requestsLoaded: false,
    };
  }

  componentDidMount() {
    this.props.getLocations();
  }

  componentWillReceiveProps(nextProps) {
    if (Object.keys(nextProps.user.loaded).length > 0
    && !this.state.requestsLoaded) {
      this.props.getClientStays(nextProps.user.loaded.client.id);
      this.setState({ requestsLoaded: true });
    }
  }

  render() {
    const {
      locations,
      requests,
    } = this.props;
    const locationsLoading = locations.loading ||
      locations.loaded.length <= 0;
    const hqsLocations = locations.loaded.length <= 0 ? [] :
      locations.loaded.filter(location => location.hqs)
        .map(location => location);
    const allRequests = requests.clientStays.length <= 0 ? [] :
      requests.clientStays;

    return (
      <ClientStyles>
        <Requests
          title="Requested stays"
          stays={allRequests}
        />
        {locationsLoading ? <SmallLoader /> :
        <Locations
          title="Locations near you"
          locations={hqsLocations}
        />}
      </ClientStyles>
    );
  }
}

ClientDashboard.propTypes = {
  user: PropTypes.shape({
    loaded: PropTypes.shape({
      client: PropTypes.shape({
        id: PropTypes.number,
      }),
    }),
  }).isRequired,
  locations: PropTypes.shape({
    loading: PropTypes.bool,
    loaded: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  requests: PropTypes.shape({
    clientStays: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  getLocations: PropTypes.func.isRequired,
  getClientStays: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(ClientDashboard);

