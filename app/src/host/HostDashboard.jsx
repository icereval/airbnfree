import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HostStyles from './host.style';
import Requests from '../requests/Requests';
import Locations from '../locations/Locations';
import SmallLoader from '../loading/SmallLoader';
import * as LocationsActions from '../locations/locationsActions';

class HostDashboard extends Component {
  componentDidMount() {
    this.props.getLocations();
  }

  render() {
    const {
      locations,
      user,
    } = this.props;
    const hostLocations = locations.loaded.length <= 0 ? [] :
      locations.loaded
        .filter(location => location.host.id === user.loaded.id)
        .map(location => location);

    return (
      <HostStyles>
        <Requests
          explanation="Review requests for your locations"
          locations={[]}
        />
        {locations.loading ? <SmallLoader /> :
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
    loaded: PropTypes.shape({}),
  }).isRequired,
  locations: PropTypes.shape({
    loading: PropTypes.bool,
    loaded: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  getLocations: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user,
    locations: state.locations,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign(
    {},
    LocationsActions,
  ), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HostDashboard);

