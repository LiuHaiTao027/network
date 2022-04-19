import React, { Component } from 'react'
import { Layout } from 'antd';

const { Footer } = Layout;

export default class Footers extends Component {
  render() {
    return (
        <Footer style={{ textAlign: 'center' }}>Page Design ©2022 Created by Curtis </Footer>
    )
  }
}
