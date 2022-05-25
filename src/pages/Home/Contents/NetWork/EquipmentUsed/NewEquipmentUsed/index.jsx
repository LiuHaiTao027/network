import React, { Component } from 'react'
import { Form, Row, Col, DatePicker, Input, Button, Select, Divider, Typography, message } from 'antd';
import axios from 'axios'
import './index.css'
import TextArea from 'antd/lib/input/TextArea';

const { Title } = Typography;
const { Option } = Select
export default class NewEquipmentUsed extends Component {
    state = {
        EquipmentUsed: {
            date: '',
            IP: '',
            original_location: 'IT-WH',
            Use_location: '',
            recorder: localStorage.getItem('username'),
            property_number: '',
            serial_number: '',
            model: '',
            isRoll_out: '',
            editors: '',
            note: '',
        },
        users: []
    }
    async componentDidMount() {
        try {
            const result = await axios.post('/api/users')
            const newUsers = this.state.users
            newUsers.push(...result.data)
            this.setState({ users: newUsers })
        } catch (error) {
            message.error('网络错误')
        }
    }
    handleSubmit = async () => {
        const newInfo = { ...this.state.EquipmentUsed }
        newInfo.editors = localStorage.getItem('username')
        if (newInfo.Use_location !== '' && newInfo.date !== '' && newInfo.recorder !== '') {
            try {
                const result = await axios.post('/api/NewEquipmentUsed', newInfo)
                if (result.data === 'OK') {
                    message.success('数据增加成功')
                    this.props.history.push({
                        pathname: '/Home/EquipmentUsed'
                    })
                }
            } catch (error) {
                message.error('请检查网络设置，或稍后再试')
            }
        } else {
            message.warning('请将信息填写完整')
        }
    }

    onChange = (typeNode) => {
        const { EquipmentUsed } = this.state
        return (date, dateString) => {
            if (typeNode === 'date') {
                EquipmentUsed.date = dateString
            }
            else if (typeNode === 'IP') {
                EquipmentUsed.IP = date.target.value
            }
            else if (typeNode === 'original_location') {
                EquipmentUsed.original_location = date.target.value
            }
            else if (typeNode === 'Use_location') {
                EquipmentUsed.Use_location = date.target.value
            }
            else if (typeNode === 'recorder') {
                EquipmentUsed.recorder = dateString.value
            }
            else if (typeNode === 'property_number') {
                EquipmentUsed.property_number = date.target.value
            }
            else if (typeNode === 'serial_number') {
                EquipmentUsed.serial_number = date.target.value
            }
            else if (typeNode === 'model') {
                EquipmentUsed.model = date.target.value
            }
            // else if (typeNode === 'isRoll') {
            //     if (date === true) EquipmentUsed.isRoll = '是'
            //     if (date === false) EquipmentUsed.isRoll = '否'

            // }
            else if (typeNode === 'isRoll_out') {
                EquipmentUsed.isRoll_out = dateString.value
                // if (date === true) EquipmentUsed.isRoll_out = '是'
                // if (date === false) EquipmentUsed.isRoll_out = '否'

            }
            else if (typeNode === 'note') {
                EquipmentUsed.note = date.target.value
            }
            this.setState({ EquipmentUsed })
        }
    }

    render() {
        // const { users } = this.state
        return (
            <Form className="ISP-form" layout='horizontal'>
                <Title style={{ paddingTop: 20, marginLeft: 20 }} level={3}>设备使用登记</Title>
                <Divider />
                <Row className='Row'>
                    <Col span={6}>
                        <Form.Item label='日期' className='Item'>
                            <DatePicker onChange={this.onChange('date')} />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label='IP' className='Item'>
                            <Input placeholder='IP地址' onChange={this.onChange('IP')}></Input>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label='记录人' className='Item'>
                            {localStorage.getItem('username')}
                            {/* <Select
                                style={{ width: 130 }}
                                placeholder="Please select"
                                onChange={this.onChange('recorder')}
                            >
                                {users.map((user) => {
                                    return (
                                        <Option key={user} value={user}>{user}</Option>
                                    )
                                })}
                            </Select> */}
                        </Form.Item>
                    </Col>
                </Row>
                <Row className='Row'>
                    <Col span={6} >
                        <Form.Item label='原位置' className='Item'>
                            <Input ref={c => this.original_location = c} bordered={false} defaultValue='IT-WH' onChange={this.onChange('original_location')}></Input>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label='使用位置' className='Item'>
                            <Input placeholder='please input' onChange={this.onChange('Use_location')}></Input>
                        </Form.Item>
                    </Col>

                </Row>
                <Row className='Row'>
                    <Col span={6}>
                        <Form.Item className='Item' label='财编'>
                            <Input onChange={this.onChange('property_number')} placeholder='please input' style={{ width: 150 }}></Input>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item className='Item' label='序列号'>
                            <Input onChange={this.onChange('serial_number')} placeholder='please input' style={{ width: 160 }}></Input>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item className='Item' label='设备型号'>
                            <Input onChange={this.onChange('model')} placeholder='please input' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row className='Row'>
                    <Col span={6}>
                    <Form.Item className='Item' label='设备异动状态'>

                        <Select
                            style={{ width: 150 }}
                            placeholder="Please select"
                            onChange={this.onChange('isRoll_out')}>
                            <Option key='需转出-已转'>需转出-已转</Option>
                            <Option key='需转出-未转'>需转出-未转</Option>
                            <Option key='无需转出'>无需转出</Option>
                            <Option key='新购无财编'>新购无财编</Option>
                            <Option key='新购有财编'>新购有财编</Option>
                        </Select>
                        </Form.Item>

                        {/* <div className='Item'>
                            <span style={{ marginRight: 5 }}>是否需要转出?</span>
                            <Switch onChange={this.onChange('isRoll')} checkedChildren="是" unCheckedChildren="否" defaultChecked />
                        </div>
                    </Col>
                    <Col>
                        <div className='Item'>
                            <span style={{ marginRight: 5 }}>是否已经转出?</span>
                            <Switch onChange={this.onChange('isRoll_out')} checkedChildren="是" unCheckedChildren="否" />
                        </div> */}
                    </Col>
                </Row>
                <TextArea onBlur={this.onChange('note')} rows={5} className='note' placeholder="备注" />
                <Row className='Row' justify='center'>
                    <Col span={6} >
                        <Button onClick={this.handleSubmit} style={{ width: 150 }} type='primary'>提交</Button>
                    </Col>
                </Row>
            </Form >
        )
    }
}
