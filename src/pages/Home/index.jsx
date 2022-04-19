import React, { Component } from 'react'
import { Link, Route, Switch } from "react-router-dom";

// import {PubSub} from 'pubsub-js'
// import axios from 'axios'
/*引入样式组件*/
import { Layout, Menu } from 'antd';
import { GlobalOutlined, PhoneOutlined, UnorderedListOutlined } from "@ant-design/icons";
// import './App.css'
/*引入路由组件*/
import NightShift from "./Contents/NetWork/NightShift";
/*引入静态组件*/
import Headers from '../../components/Headers'
import Footers from '../../components/Footers'
// Network
import NetworkTools from "./Contents/NetWork/NetworkTools";
import Architecture from "./Contents/NetWork/Architecture";
import TurnList from './Contents/NetWork/NightShift/TurnList'
import EquipmentUsed from "./Contents/NetWork/EquipmentUsed";
// telmenagement
import ISP_Charge from './Contents/Tel_Manage/ISP_Charge'
import NewISPCharge from './Contents/Tel_Manage/ISP_Charge/NewISPCharge'
import NewEquipmentUsed from './Contents/NetWork/EquipmentUsed/NewEquipmentUsed'


const { Sider, Content } = Layout;
const { SubMenu } = Menu;

export default class Home extends Component {
    state = {
        collapsed: false,
        siderHeight: document.body.clientHeight,
        ContentWidth: 200
    };

    onCollapse = collapsed => {
        this.setState({ collapsed }, () => {
            setTimeout(() => {
                collapsed ? this.setState({ ContentWidth: 80 }) : this.setState({ ContentWidth: 200 })
            },1)
        });
    };

    componentDidUpdate() {
        const { collapsed } = this.state
        collapsed ? this.checkPage.style.width = 0 : this.checkPage.style.width = 150 + 'px'
    }
    render() {
        const { collapsed, ContentWidth } = this.state;
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    theme='dark'
                    // defaultCollapsed
                    collapsible
                    collapsed={collapsed}
                    onCollapse={this.onCollapse}
                    style={{
                        overflow: 'auto',
                        height: '100vh',
                        position: 'fixed',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        // height:siderHeight
                    }}
                >
                    <div style={{ display: 'flex', height: 31, width: 150 }} ref={c => this.checkPage = c} className="logo" > </div>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <SubMenu key="sub1" icon={<UnorderedListOutlined />} title="日常管理">
                            <Menu.Item key="1">
                                <Link to='/Budget'>预算管理</Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to='/EquipmentUsed'>PR管理</Link>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Link to='/Architecture'>MA管理</Link>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <Link to='/EquipmentUsed'>Task管理</Link>
                            </Menu.Item>
                            <Menu.Item key="5">
                                <Link to='/EquipmentUsed'>Contract</Link>
                            </Menu.Item>
                        </SubMenu>
                        {/*电话管理界面*/}
                        <SubMenu key="sub2" icon={<PhoneOutlined />} title="电话管理">
                            <Menu.Item key="6">
                                <Link to='/Homift'>分机管理</Link>
                            </Menu.Item>
                            <Menu.Item key="7">
                                <Link to='/EquipmentUsed'>速拨管理</Link>
                            </Menu.Item>
                            <Menu.Item key="8">
                                <Link to='/Architecture'>电话密码查询</Link>
                            </Menu.Item>
                            <Menu.Item key="9">
                                <Link to='/EquipmentUsed'>分机查询</Link>
                            </Menu.Item>
                            <Menu.Item key="10">
                                <Link to='/Home/ISP_Charge'>ISP Charge</Link>
                            </Menu.Item>
                        </SubMenu>
                        {/*网络管理界面*/}
                        <SubMenu key="sub3" icon={<GlobalOutlined />} title="网络管理">
                            <Menu.Item key="11">
                                <Link to='/Home/NightShift'>白夜班交接记录</Link>
                            </Menu.Item>
                            <Menu.Item key="12">
                                <Link to='/Home/EquipmentUsed'>设备使用登记</Link>
                            </Menu.Item>
                            <Menu.Item key="13">
                                <Link to='/Home/Architecture'>网络架构</Link>
                            </Menu.Item>
                            <Menu.Item key="14">
                                <Link to='/Home/NetworkTools'>网络常用工具</Link>
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout className="site-layout" style={{ marginLeft: ContentWidth }}>
                    <Headers />
                    <Content style={{ margin: '0 16px' }}>
                        <Switch>
                            <Route path='/Home/NightShift' component={NightShift} />
                            <Route path='/Home/EquipmentUsed' component={EquipmentUsed} />
                            <Route path='/Home/Architecture' component={Architecture} />
                            <Route path='/Home/NetworkTools' component={NetworkTools} />
                            <Route path="/Home/TurnList" component={TurnList} />
                            <Route path="/Home/ISP_Charge" component={ISP_Charge} />
                            <Route path="/Home/NewISPCharge" component={NewISPCharge} />
                            <Route path="/Home/NewEquipmentUsed" component={NewEquipmentUsed} />
                            <Route path="/Home/NetworkTools" component={NetworkTools} />
                        </Switch>
                    </Content>
                    <Footers />
                </Layout>
            </Layout>
        )
    }
}

