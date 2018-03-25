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
    const { locations } = this.props;

    return (
      <HostStyles>
        <h2>Host Dashboard</h2>
        <Requests
          explanation="Review requests for your locations"
          locations={[]}
        />
        {locations.loading ? <SmallLoader /> :
        <Locations locations={locations.loaded} />}
      </HostStyles>
    );
  }
}

HostDashboard.propTypes = {
  locations: PropTypes.shape({
    loading: PropTypes.bool,
    loaded: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  getLocations: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
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

