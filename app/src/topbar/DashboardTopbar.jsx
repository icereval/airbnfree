import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TopbarStyles from './topbar.styles';
import logo from '../../public/images/aribnfree-logo.png';

const DashboardTopbar = props => (
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
        <Link href="/" to={`/dashboard/${props.type}`}>Locations</Link>
        <Link href="/" to="/dashboard/profile">Profile</Link>
        <Link href="/" to="/">Log out</Link>
      </div>
    </div>
  </TopbarStyles>
);

DashboardTopbar.propTypes = {
  type: PropTypes.string.isRequired,
};

export default DashboardTopbar;

