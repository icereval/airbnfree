import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import {
  Form,
  Input,
  Button,
} from 'antd';

const FormItem = Form.Item;

class SignupForm extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const data = Object.assign({}, values, {
          type: this.props.type,
        });
        this.props.signup(data).then((error) => {
          if (!error) {
            this.props.history.push('/dashboard');
          }
        });
      }
    });
  }

  render() {
    const {
      getFieldDecorator,
    } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator('firstname', {
            rules: [{
                required: true,
                message: 'first name is required',
            }],
            })(<Input placeholder="first name" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('lastname', {
            rules: [{
                required: true,
                message: 'last name is required',
            }],
            })(<Input placeholder="last name" />)}
        </FormItem>
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
                Sign up
          </Button>
          <Button className="simple-button" onClick={this.props.goback}>
              Go back.
          </Button>
        </FormItem>
      </Form>
    );
  }
}

SignupForm.propTypes = {
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func,
    validateFieldsAndScroll: PropTypes.func,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  type: PropTypes.string.isRequired,
  goback: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired,
};


const WrappedForm = Form.create()(SignupForm);

export default withRouter(WrappedForm);
