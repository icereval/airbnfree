import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DashboardStyles from './dashboard.style';
import DashboardTopbar from '../topbar/DashboardTopbar';
import Profile from '../profile/Profile';
import DashboardLoader from '../loading/DashboardLoader';
import * as UserActions from '../user/userActions';

class Dashboard extends Component {
  componentDidMount() {
    console.log('did mount');
    this.props.getUser();
  }

  render() {
    const loading = !this.props.user.loaded ||
      this.props.user.loading;

    return (
      <DashboardStyles>
        <DashboardTopbar />
        <Route path="/dashboard/profile" component={Profile} />
        {loading ? <DashboardLoader /> :
        <div>Dashboard</div>
        }
      </DashboardStyles>
    );
  }
}

Dashboard.propTypes = {
  user: PropTypes.shape({
    loaded: PropTypes.shape({}),
    loading: PropTypes.bool,
  }).isRequired,
  getUser: PropTypes.func.isRequired,
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
