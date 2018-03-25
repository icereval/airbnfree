import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { Button } from 'antd';
import TopbarStyles from './topbar.styles';
import logo from '../../public/images/aribnfree-logo.png';
import * as AuthActions from '../auth/authActions';

class DashboardTopbar extends Component {
  constructor(props, context) {
    super(props, context);

    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.logout().then((data) => {
      const { error } = data;

      if (!error) {
        this.props.history.push('/');
      }
    });
  }

  render() {
    const { user } = this.props;

    return (
      <TopbarStyles>
        <div className="topbar">
          <div className="topbar-logo">
            <img
              src={logo}
              alt="Airbnfree"
              style={{
                height: 48,
                width: 60,
              }}
            />
            <h2>Airbnfree</h2>
          </div>
          <div className="topbar-links">
            <Link href="/" to={`/dashboard/${user.loaded.type}`}>Locations</Link>
            <Link href="/" to="/dashboard/profile">Profile</Link>
            <Button
              onClick={this.logout}
              className="topbar-button"
            >
              Log out
            </Button>
          </div>
        </div>
      </TopbarStyles>
    );
  }
}

DashboardTopbar.propTypes = {
  user: PropTypes.shape({
    loaded: PropTypes.shape({
      type: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  logout: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign(
    {},
    AuthActions,
  ), dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DashboardTopbar));

