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
  constructor(props, context) {
    super(props, context);

    this.state = {
      loading: true,
    };
  }

  componentWillMount() {
    this.props.getUser().then((user) => {
      this.setState({ loading: false });
      this.props.history.push(`/dashboard/${user.type}`);
    });
  }

  render() {
    const { user } = this.props;

    return (
      <DashboardStyles>
        {this.state.loading ? <DashboardLoader /> :
        <div>
          <DashboardTopbar type={user.loaded.type} />
          <div>Dashboard</div>
        </div>}
        <Route path="/dashboard/profile" component={Profile} />
      </DashboardStyles>
    );
  }
}

Dashboard.propTypes = {
  user: PropTypes.shape({
    loaded: PropTypes.shape({
      type: PropTypes.string,
    }),
    loading: PropTypes.bool,
  }).isRequired,
  getUser: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
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
