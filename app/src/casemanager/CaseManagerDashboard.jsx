import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CaseManagerStyles from './casemanager.style';
import Requests from '../requests/Requests';
import Locations from '../locations/Locations';
import SmallLoader from '../loading/SmallLoader';
import * as LocationsActions from '../locations/locationsActions';

class CaseManagerDashboard extends Component {
  componentDidMount() {
    this.props.getLocations();
  }

  render() {
    const { locations } = this.props;
    const locationsLoading = locations.loading ||
      locations.loaded.length <= 0;
    const hqsLocations = locations.loaded.length <= 0 ? [] :
      locations.loaded.filter(location => location.hqs)
        .map(location => location);
    const nonCertifiedHQS = locations.loaded.length <= 0 ? [] :
      locations.loaded.filter(location => !location.hqs)
        .map(location => location);

    return (
      <CaseManagerStyles>
        <Requests
          explanation="Review requests for your locations"
          locations={[]}
        />
        {locationsLoading ? <SmallLoader /> :
        <div>
          <Locations
            title="Locations pending certification"
            locations={nonCertifiedHQS}
          />
          <Locations
            title="HQS Certified locations"
            locations={hqsLocations}
          />
        </div>}
      </CaseManagerStyles>
    );
  }
}

CaseManagerDashboard.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(CaseManagerDashboard);

