import React, { Component } from 'react';
import HomePath from "../../HomePath";
import { Content } from "antd/es/layout/layout";
import { Table, Select, Button, message } from "antd";


// import NewTurnClass from "./NewTurnClass";

const { Option } = Select;


class NightShift extends Component {
    state = {
        display: 'block',
        isDisabled: false,
        data: [
            {
                key: 'data',
                view: 'view',
                department: 'KDLD30',
                username: '',
                classType: '',
                handoverType: '',
            }
        ],
        columns: [
            {
                title: '',
                dataIndex: 'view',
                key: 'view',
                align: 'center',
                render: () => (
                    <span>
                        <Button onClick={this.onDisplayNone} style={{ fontSize: 16 }} type="link">view</Button>
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
                render: () => {
                    return (
                        <Select
                            defaultValue="All"
                            style={{ width: '100%', height: '100%' }}
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
                render: () => {
                    return (
                        <Select
                            defaultValue="All"
                            style={{ width: '100%', height: '100%' }}
                            onChange={this.saveFormData('handoverType')}
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
                    const { isDisabled } = this.state
                    return (
                        <span>
                            <Button disabled={isDisabled} type={"primary"} onClick={this.toNewAbnormal} style={{ fontSize: 16 }} >新增</Button>
                        </span>
                    )
                },
            },
        ]
    }
    saveFormData = (type) => {
        return (value) => {
            if (type === 'classType') {
                const newData = [...this.state.data]
                newData[0].classType = value
                this.setState({ data: newData })
            } else if (type === 'handoverType') {
                const newData = [...this.state.data]
                newData[0].handoverType = value
                this.setState({ data: newData })
            }
        }
    }

    onDisplayNone = () => {
        this.props.history.push({
            pathname: '/Home/TurnList',
        });
    }

    toNewAbnormal = () => {
        if (this.state.data[0].classType === '' && this.state.data[0].handoverType === '') {
            message.error('请选择班别类型与交接类型')
        } else if (this.state.data[0].classType === '') {
            message.error('请选择班别类型')
        } else if (this.state.data[0].handoverType === '') {
            message.error('请选择交接类型')
        } else if (this.state.data[0].classType === 'All') {
            message.warning('类型不能为All')
        } else if (this.state.data[0].handoverType === 'All') {
            message.warning('类型不能为All')
        } else if(this.state.data[0].handoverType === '转班交接'){
            this.setState({ isDisabled: true })
            this.props.history.push({
                pathname: '/Home/NewTurnClass',
                // state: { username: this.state.data[0].username, classType: this.state.data[0].classType }
            })
        }
        else {
            this.setState({ isDisabled: true })
            this.props.history.push({
                pathname: '/Home/NewAbnormal',
                state: { username: this.state.data[0].username, classType: this.state.data[0].classType }
            })
        }
    }

    async componentDidMount() {
        const username = localStorage.getItem('username')
        const newData = [...this.state.data]
        newData[0].username = username
        newData[0].key = 1
        this.setState({ data: newData })
    }

    render() {
        const { columns, data } = this.state
        return (
            <Content style={{ margin: '0 16px' }}>
                <HomePath />
                <Table
                    ref={c => this.displayChange = c}
                    bordered
                    columns={columns}
                    dataSource={data}
                    pagination={{ position: [] }}
                    style={{ display: `${this.state.display}` }}
                />

                {/* <Switch>
                    <Route path="/NightShift/NewTurnClass" component={NewTurnClass} />
                    <Route path="/Home/NightShift/NewAbnormal" component={NewAbnormal} />
                </Switch> */}
            </Content>
        );
    }
}

export default NightShift;