import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Input,
  Button,
} from 'antd';
import { Link } from 'react-router-dom';
import LoginStyles from './login.style';
import logo from '../../public/images/aribnfree-logo.png';

const FormItem = Form.Item;

class Login extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Log in!');
      }
    });
  }

  render() {
    const {
      getFieldDecorator,
    } = this.props.form;

    return (
      <LoginStyles>
        <div className="login-box">
          <Form onSubmit={this.handleSubmit}>
            <div className="login-header">
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
            <FormItem>
              {getFieldDecorator('email', {
                  rules: [{
                    required: true,
                    message: 'e-mail is required',
                  }],
                })(<Input placeholder="email" />)}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                  rules: [{
                    required: true,
                    message: 'password is required',
                  }],
                })(<Input placeholder="password" type="password" />)}
            </FormItem>
            <FormItem>
              <Button htmlType="submit">
                    Log in
              </Button>
              <Link href="/" to="/signup">
                    Don&#39;t have an account? Sign up.
              </Link>
            </FormItem>
          </Form>
        </div>
      </LoginStyles>
    );
  }
}

Login.propTypes = {
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func,
    validateFieldsAndScroll: PropTypes.func,
  }).isRequired,
};


const WrappedLogin = Form.create()(Login);

export default WrappedLogin;
