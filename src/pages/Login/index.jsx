import React, { Component } from 'react'
import { Form, Input, Button, message } from 'antd';
import { withRouter } from 'react-router-dom'
import './index.css'
import axios from 'axios';

class Login extends Component {
  state = {
    workNumber: '',
    password: ''
  }
  savaForm = (NodeType) => {
    return (event) => {
      this.setState({ [NodeType]: event.target.value })
    }
  }
  handleSubmit = async () => {
    const user = {
      workNumber: this.state.workNumber,
      password: this.state.password
    }
    try {
      const result = await axios.post('http://10.62.22.249:8000/login', user)
      const nowToken = { token: result.data }
      console.log(result);
      if (result.data === '账号密码错误') {
        message.warning(result.data)
      } 
      else if (result.data === 'please reset your password') {
        // 页面重定向至修改密码界面
        message.warning('请修改初始密码')
        this.props.history.push("/updatePassword");
      }
      else if (result.data === undefined) {
        message.error('账户认证失败，请联系管理员')
      }else{
        const info = await axios.post('/api/user', nowToken)
        // 将用户名写入localStorage中，这可以制作用户名显示在页面上的效果
        localStorage.setItem("username", info.data);
        // 将token写入
        localStorage.setItem("token", result.data);
        // 写入后进行页面跳转
        this.props.history.push("/home");
      }
    } catch (error) {
      if (error) throw error
    }
  }
  render() {
    return (
      <div className='wrapper'>
        <Form layout={'vertical'} className="login-form">
          <Form.Item>
            <h1><strong>网络系统管理</strong></h1>
          </Form.Item>
          <Form.Item>
            <Input
              placeholder="workNumber"
              onChange={this.savaForm('workNumber')}
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
          <Form.Item>
            <p onClick={()=>{message.warning('请联系管理员进行修改密码')}}>Forgot your password?</p>
          </Form.Item>
        </Form>
      </div>
    );
  }
}


export default withRouter(Login)