import React, { Component } from 'react'
import { Breadcrumb } from 'antd';
// import { Route } from 'react-router-dom';
export default class HomePath extends Component {
  render() {
    return (
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item >网络管理</Breadcrumb.Item>
        <Breadcrumb.Item >白夜班交接记录</Breadcrumb.Item>
      </Breadcrumb>

      // <Route name="Contents" breadcrumbName="首页" path="/" component={Contents}>
  
      // </Route>

    )
  }
}
