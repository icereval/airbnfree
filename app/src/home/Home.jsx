import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import Topbar from '../topbar/Topbar';
import HomeStyles from './home.style';

export default class Home extends Component {
  constructor(props, context) {
    super(props, context);
    this.navigateToSignup = this.navigateToSignup.bind(this);
  }

  navigateToSignup() {
    this.props.history.push('/signup');
  }

  render() {
    return (
      <HomeStyles>
        <Topbar />
        <div className="home-content">
          <h1>Your home away from home.</h1>
          <Button onClick={this.navigateToSignup}>
            Get started
          </Button>
        </div>
      </HomeStyles>
    );
  }
}

Home.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

