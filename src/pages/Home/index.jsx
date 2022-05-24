import React, { Component } from 'react'
import { Route, Switch } from "react-router-dom";

// import {PubSub} from 'pubsub-js'
// import axios from 'axios'
/*引入样式组件*/
import { Layout } from 'antd';
// import './App.css'
/*引入路由组件*/
import NightShift from "./Contents/NetWork/NightShift";
/*引入静态组件*/
import Headers from '../../components/Headers'
import Footers from '../../components/Footers'
import Siders from '../../components/Siders'
// UserManagement
import UserManagement from './Contents/UserManagement'
// Network
import NetworkTools from "./Contents/NetWork/NetworkTools";
import NewAbnormal from "./Contents/NetWork/NightShift/NewAbnormal";
import NewTurnClass from "./Contents/NetWork/NightShift/NewTurnClass"
import Architecture from "./Contents/NetWork/Architecture";
import TurnList from './Contents/NetWork/NightShift/TurnList'
import EquipmentUsed from "./Contents/NetWork/EquipmentUsed";
// telmenagement
import ISP_Charge from './Contents/Tel_Manage/ISP_Charge'
import NewISPCharge from './Contents/Tel_Manage/ISP_Charge/NewISPCharge'
import NewEquipmentUsed from './Contents/NetWork/EquipmentUsed/NewEquipmentUsed'
import Test from './Contents/Tel_Manage/Subo'

const { Content } = Layout;

export default class Home extends Component {
    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Siders />
                <Layout className="site-layout">
                    <Headers />
                    <Content style={{ margin: '0 16px' }}>
                        <Switch>
                            <Route path='/Home/users' component={UserManagement}/>
                            <Route path='/Home/NightShift' component={NightShift} />
                            <Route path="/Home/TurnList" component={TurnList} />
                            <Route path="/Home/NewAbnormal" component={NewAbnormal} />
                            <Route path='/Home/NewTurnClass' component={NewTurnClass} />
                            <Route path='/Home/EquipmentUsed' component={EquipmentUsed} />
                            <Route path="/Home/NewEquipmentUsed" component={NewEquipmentUsed} />

                            <Route path='/Home/Architecture' component={Architecture} />
                            <Route path="/Home/NetworkTools" component={NetworkTools} />

                            <Route path="/Home/ISP_Charge" component={ISP_Charge} />
                            <Route path="/Home/NewISPCharge" component={NewISPCharge} />
                            <Route path="/Home/Test" component={Test} />
                        </Switch>
                    </Content>
                    <Footers />
                </Layout>
            </Layout>
        )
    }
}

