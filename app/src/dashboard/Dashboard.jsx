import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DashboardStyles from './dashboard.style';
import DashboardTopbar from '../topbar/DashboardTopbar';
import Profile from '../profile/Profile';
import DashboardLoader from '../loading/DashboardLoader';
import HostDashboard from '../host/HostDashboard';
import * as UserActions from '../user/userActions';

class Dashboard extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      loading: true,
    };
  }

  componentWillMount() {
    this.props.getUser().then((user) => {
      const {
        history,
      } = this.props;

      this.setState({ loading: false });
      if (history.location.pathname === '/dashboard/' ||
          history.location.pathname === '/dashboard') {
        history.push(`/dashboard/${user.response.type}`);
      }
    });
  }

  render() {
    return (
      <DashboardStyles>
        {this.state.loading ? <DashboardLoader /> :
        <DashboardTopbar />}
        <Route path="/dashboard/profile" component={Profile} />
        <Route path="/dashboard/host" component={HostDashboard} />
      </DashboardStyles>
    );
  }
}

Dashboard.propTypes = {
  getUser: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign(
    {},
    UserActions,
  ), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
