import React, { Component } from 'react'
// const _ = require('lodash')
import _ from 'lodash'
// import { Table, Switch } from 'antd';
// import PubSub from 'pubsub-js'
// import './index.css'
import { Table, Spin, Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';


export default class TurnList extends Component {
    state = {
        columns: [
            {
                title: '班别',
                width: 100,
                dataIndex: 'classType',
                key: 'classType',
                fixed: 'left',
                filters: [{
                    text: '白班',
                    value: '白班',
                }, {
                    text: '夜班',
                    value: '夜班',
                }
                ],
                onFilter(value, record) {
                    if (value === '白班') {
                        return record.classType === '白班'
                    } else if (value === '夜班') {
                        return record.classType === '夜班'
                    }
                },
                // sorter(preValue, currentValue) {
                //   return preValue.calssDate.length - currentValue.name.length;
                // }
            },
            {
                title: '班别日期',
                width: 100,
                dataIndex: 'dutyDate',
                key: 'dutyDate',
            },
            {
                title: '交接日期',
                width: 100,
                dataIndex: 'HandoverDate',
                key: 'HandoverDate',
            },
            {
                title: '处理人',
                dataIndex: 'people',
                key: 'people',
                width: 150,
                filters: [],
                onFilter(value, record) {
                    if (value === record.people) return record.people
                },
            },
            {
                title: '联络人',
                dataIndex: 'Contact',
                key: 'Contact',
                width: 150,
            },
            {
                title: '异常持续时间',
                dataIndex: 'duration',
                key: 'duration',
                width: 150,
            },
            {
                title: '异常事件',
                dataIndex: 'event',
                key: 'event',
                width: 150,
                ellipsis: true,
            },
            {
                title: '异常影响',
                dataIndex: 'influence',
                key: 'influence',
                width: 150,
                ellipsis: true,
            },
            {
                title: '异常原因',
                dataIndex: 'reason',
                key: 'reason',
                width: 150,
                ellipsis: true,
            },
            {
                title: '解决方案',
                dataIndex: 'solution',
                key: 'solution',
                width: 150,
                ellipsis: true,
            },
            {
                title: '有无停线',
                dataIndex: 'stop',
                key: 'stop'
            },
            {
                title: '停线单号',
                dataIndex: 'odd',
                key: 'odd'
            },
            {
                title: 'Action',
                key: 'operation',
                fixed: 'right',
                width: 100,
                render: () => {
                    return (
                        <a>file</a>
                    )
                },
            },
        ],
        info: [],
        fixedTop: false,
        setFixedTop: false,
        isLoading: false, //标识是否处于加载中
        errorMsg: '', //错误信息
        isUpdate: true
    }
    async componentDidMount() {
        this.setState({ isLoading: true })
        try {
            const result = await axios.get('/api/event')
            const newInfo = result.data.map((item) => {
                return { ...item, key: item._id }
            })
            // 遍历 info 取出 people 中的内容， 将内容赋值给 columns的 filters
            this.setState({ info: newInfo, isLoading: false }, () => {
                this.state.info.forEach((i) => {
                    this.state.columns[3].filters.push({ text: i.people, value: i.people })
                    this.state.columns[3].filters = _.uniqWith(this.state.columns[3].filters, _.isEqual)
                })
            })
            // 强制更新状态， 以显示filters的内容
            this.setState({ isUpdate: true })
        } catch (error) {
            this.setState({ errorMsg: error.message })
        }
    }

    render() {
        const { isLoading } = this.state
        return (
            <Spin spinning={isLoading} size='large' >
                <Table
                    style={{ marginTop: 30 }}
                    bordered
                    columns={this.state.columns}
                    dataSource={this.state.info}
                    scroll={{ x: 1800, y: 500 }}
                    expandable={{
                        expandedRowRender: record => <div style={{ margin: 0 }}>
                            <p style={{ borderBottom: 'solid 1px black' }}>异常事件：{record.event}</p>
                            <p style={{ borderBottom: 'solid 1px black' }}>异常原因：{record.reason}</p>
                            <p style={{ borderBottom: 'solid 1px black' }}>解决方案：{record.solution}</p>
                        </div>,
                        rowExpandable: record => record.event !== 'Not Expandable',
                    }}
                    pagination={{
                        position: ['bottomCenter'],
                        showSizeChanger: true,
                    }}
                    sticky
                />
            </Spin>
        )
    }
}