import React from 'react';
import { Link } from 'react-router-dom';
import TopbarStyles from './topbar.styles';
import logo from '../../public/images/aribnfree-logo.png';

const Topbar = () => (
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
        <Link href="/" to="/signup">Sign up</Link>
        <Link href="/" to="/login">Log in</Link>
      </div>
    </div>
  </TopbarStyles>
);

export default Topbar;

