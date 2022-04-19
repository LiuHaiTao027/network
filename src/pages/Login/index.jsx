import React, { Component } from 'react'
import { Form, Input, Button, message } from 'antd';
import { withRouter } from 'react-router-dom'
import './index.css'
import axios from 'axios';

class Login extends Component {
  state = {
    username: '',
    password: ''
  }
  savaForm = (NodeType) => {
    return (event) => {
      this.setState({ [NodeType]: event.target.value })
    }
  }
  handleSubmit = async () => {
    const user = {
      name: this.state.username,
      password: this.state.password
    }
    try {
      const result = await axios.post('/api/login', user)
      if (result.headers.token !== undefined) {
        this.props.history.push({
          pathname: '/Home'
        })
      } else {
        message.error('账户不存在，请先注册再尝试进行登录')
      }
    } catch (error) {
      if (error) throw error
    }
  }
  render() {
    return (
      <Form layout={'vertical'} className="login-form">
        <Form.Item>
          <Input
            placeholder="Username"
            onChange={this.savaForm('username')}
          />,
        </Form.Item>
        <Form.Item >
          <Input
            type="password"
            placeholder="Password"
            onChange={this.savaForm('password')}
          />,
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={this.handleSubmit} className="login-form-button">
            登录
          </Button>
        </Form.Item>
      </Form>
    );
  }
}


export default withRouter(Login)