import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import SignupStyles from './signup.style';
import SignupForm from './SignupForm';
import logo from '../../public/images/aribnfree-logo.png';

export default class Signup extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      type: '',
    };

    this.renderFormType = this.renderFormType.bind(this);
    this.selectFormType = this.selectFormType.bind(this);
    this.goback = this.goback.bind(this);
  }

  selectFormType(type) {
    this.setState({ type });
  }

  goback() {
    this.setState({ type: '' });
  }

  renderFormType() {
    switch (this.state.type) {
      case 'client':
        return <SignupForm type="client" goback={this.goback} />;
      case 'host':
        return <SignupForm type="host" goback={this.goback} />;
      default:
        return (
          <div className="signup-type">
            <div className="signup-buttons">
              <Button onClick={() => this.selectFormType('host')}>
                Become a host
              </Button>
              <Button onClick={() => this.selectFormType('client')}>
                Find a place to stay
              </Button>
            </div>
            <Link href="/" to="login">
                Have an account? Log in.
            </Link>
          </div>
        );
    }
  }

  render() {
    return (
      <SignupStyles>
        <div className="signup-box">
          <div className="signup-header">
            <Link href="/" to="/">
              <img
                src={logo}
                alt="Airbnfree logo"
                style={{
                  height: 48,
                  width: 60,
                }}
              />
              <h2>Airbnfree</h2>
            </Link>
          </div>
          {this.renderFormType()}
        </div>
      </SignupStyles>
    );
  }
}

