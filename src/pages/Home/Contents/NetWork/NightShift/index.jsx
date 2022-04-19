import React, { Component } from 'react';
import { Route, Switch} from "react-router-dom";
// import TurnList from "./TurnList";
import HomePath from "../../HomePath";
import { Content } from "antd/es/layout/layout";
import {Table, Select, Button} from "antd";
import NewAbnormal from "./NewAbnormal";
import NewTurnClass from "./NewTurnClass";
// import TurnList from "./TurnList";
import axios from "axios";
const { Option } = Select;



class NightShift extends Component {

    saveFormData = (type)=>{
        return (value)=>{
            if (type === 'classType') {
                const newData = [...this.state.data]
                newData[0].classType = value
                this.setState({data:newData})
            }else if (type === 'handoverType'){
                const newData = [...this.state.data]
                newData[0].handoverType = value
                // newData[0].key = 3
                this.setState({data:newData})
            }
        }
    }

    onDisplayNone =()=>{
        // this.setState({display:`${this.state.display==='block' ? 'none' : 'block'}`})
        this.props.history.push({
            pathname: '/Home/TurnList',
        });
        // console.log(this.props)
    }

    toNewAbnormal = ()=>{
        this.props.history.push({
            pathname: '/Home/NightShift/NewAbnormal',
            state:{username:this.state.data[0].username,classType:this.state.data[0].classType}
        })
    }

    async componentDidMount() {
        try {
            const result = await axios.post('/api/user')
            const personInfo = result.data

            const newData = [...this.state.data]
            newData[0].username = personInfo[0].name
            newData[0].key = 1
            this.setState({data:newData})
        }catch (err){
            if (err) throw err
        }
    }

    state = {
        display: 'block',
        data : [
            {
                key: 'data',
                view: 'view',
                department: 'KDLD30',
                username: '',
                classType: '',
                handoverType: '',
            }
        ],
        columns : [
            {
                title: '',
                dataIndex: 'view',
                key: 'view',
                align:'center',
                render: () => (
                    <span>
                        {/*<Divider type="vertical" />*/}
                        <Button onClick={this.onDisplayNone} style={{fontSize:16}} type="link">view</Button>
                    </span>
                ),
            },
            {
                title: '部门',
                dataIndex: 'department',
                key: 'department',
            },
            {
                title: '处理人',
                dataIndex: 'username',
                key: 'username',
            },
            {
                title: '班别',
                dataIndex: 'classType',
                key: 'classType',
                width: 200,
                render:()=>{
                    return(
                        <Select
                            defaultValue="All"
                            style={{width:'100%', height:'100%'}}
                            onChange={this.saveFormData('classType')}
                        >
                            <Option value='All'>All</Option>
                            <Option value="夜班">夜班</Option>
                            <Option value="白班">白班</Option>
                        </Select>
                    )
                }
            },
            {
                title: '交接类型',
                dataIndex: 'handoverType',
                key: 'handoverType',
                width: 200,
                render:()=>{
                    return(
                        <Select
                            defaultValue="All"
                            style={{width:'100%', height:'100%'}}
                            onChange={this.saveFormData('handoverType')}
                            // ref={c => this.handoverType = c}
                        >
                            <Option value='All'>All</Option>
                            <Option value="异常交接">异常交接</Option>
                            <Option value="转班交接">转班交接</Option>
                        </Select>
                    )
                }
            },
            {
                title: 'New',
                dataIndex: 'NewClass',
                key: 'NewClass',
                render: () => {
                    // console.log("record", record)
                    // console.log('1',this.state.data[0])
                    return(
                        <span>
                        {/*<Divider type="vertical" />*/}
                            <Button type={"primary"} onClick={this.toNewAbnormal} style={{fontSize:16}} >新增</Button>
                            {/*<Link  to={{pathname:'/NightShift/NewAbnormal', state:{username:this.state.data[0].username,classType:this.state.data[0].classType}}} >新增</Link>*/}
                        </span>
                    )
                },
            },
        ]
    }

    render() {
        // console.log(this.props)
        // console.log(this.state.data[0].classType)
        // console.log(this.state.data[0].handoverType)
        // console.log(this.state.display)
        // console.log(this.props.location)
        // console.log('data',this.state.data[0])
        const {columns, data} = this.state
        return (
            <Content style={{ margin: '0 16px' }}>
                <HomePath />
                <Table
                    ref={c=>this.displayChange = c}
                    bordered
                    columns={columns}
                    dataSource={data}
                    pagination={{ position: [] }}
                    style={{display:`${this.state.display}`}}
                />

                <Switch>
                    {/* <Route path="/NightShift/TurnList" component={TurnList} /> */}
                    <Route path="/NightShift/NewTurnClass" component={NewTurnClass} />
                    <Route path="/Home/NightShift/NewAbnormal" component={NewAbnormal} />
                </Switch>
            </Content>
        );
    }
}

export default NightShift;