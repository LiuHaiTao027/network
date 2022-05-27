import React, { Component } from 'react'
import { Layout, Menu } from 'antd';
import { Link, } from "react-router-dom";
import { GlobalOutlined, PhoneOutlined, UnorderedListOutlined, HomeOutlined } from "@ant-design/icons";
import './index.css'

const { SubMenu } = Menu;
const { Sider } = Layout;

export default class Siders extends Component {
    state = {
        collapsed: false,
    };

    onCollapse = collapsed => {
        this.setState({ collapsed });
    };

    componentDidUpdate() {
        const { collapsed } = this.state
        collapsed ? this.checkPage.style.width = 0 : this.checkPage.style.width = 150 + 'px'
    }
    render() {
        const { collapsed } = this.state;
        return (
            <Sider
                theme='dark'
                // defaultCollapsed
                collapsible
                collapsed={collapsed}
                onCollapse={this.onCollapse}
                style={{
                    overflow: 'auto',
                    // height: '100vh',
                    left: 0,
                    top: 0,
                    bottom: 0,
                }}
            >
                <div ref={c => this.checkPage = c} className="logo" >
                    <span style={{ padding:5, margin:'0 auto' }}>Hello,{localStorage.getItem('username')}</span>
                </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={'sub'}>
                    {/* <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline"> */}
                    <SubMenu key="sub" icon={<HomeOutlined />} title="主页">
                        <Menu.Item key="0">
                            <Link to='/Home/users'>用户管理</Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu disabled={true} key="sub1" icon={<UnorderedListOutlined />} title="日常管理">
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
                            <Link to='/Home/Test'>速拨管理</Link>
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
                            <Link to='/Home/ProcessTrack'>工程进度追踪</Link>
                        </Menu.Item>
                        <Menu.Item key="14">
                            <Link to='/Home/Architecture'>网络架构</Link>
                        </Menu.Item>
                        <Menu.Item key="15">
                            <Link to='/Home/NetworkTools'>网络常用工具</Link>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        )
    }
}
