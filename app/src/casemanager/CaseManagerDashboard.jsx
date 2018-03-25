import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CaseManagerStyles from './casemanager.style';
import Requests from '../requests/Requests';
import Locations from '../locations/Locations';
import SmallLoader from '../loading/SmallLoader';
import * as LocationsActions from '../locations/locationsActions';
import * as RequestActions from '../requests/requestActions';

class CaseManagerDashboard extends Component {
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
      this.props.getCaseManagerStays(nextProps.user.loaded.caseManager.id);
      this.setState({ requestsLoaded: true });
    }
  }

  acceptRequest(id) {
    this.props.changeStayState(id, 'casemanager-approved');
  }

  denyRequest(id) {
    this.props.changeStayState(id, 'casemanager-denied');
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
    const nonCertifiedHQS = locations.loaded.length <= 0 ? [] :
      locations.loaded.filter(location => !location.hqs)
        .map(location => location);

    return (
      <CaseManagerStyles>
        <Requests
          title="Requests for stays"
          stays={requests.caseManagerStays}
          requestAction={this.acceptRequest}
          denyAction={this.denyRequest}
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
    loaded: PropTypes.shape({
      caseManager: PropTypes.shape({
        id: PropTypes.number,
      }),
    }),
  }).isRequired,
  locations: PropTypes.shape({
    loading: PropTypes.bool,
    loaded: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  requests: PropTypes.shape({
    caseManagerStays: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  getLocations: PropTypes.func.isRequired,
  getCaseManagerStays: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(CaseManagerDashboard);

