import React, { Component } from 'react'
import { Form, Row, Col, DatePicker, Input, Button, Select, Divider, Typography, message, Upload } from 'antd';
import axios from 'axios'
import moment from "moment";
import './index.css'
import TextArea from 'antd/lib/input/TextArea';
import QueueAnim from 'rc-queue-anim'
import { UploadOutlined } from '@ant-design/icons';


const { Title } = Typography;

const { Option } = Select;


export default class NewISPCharge extends Component {
    state = {
        classType: this.props.location.state.classType,
        dutyDate: '',
        HandoverDate: '',
        people: this.props.location.state.username,
        Contact: '无',
        duration: '无',
        event: '无',
        influence: '无',
        reason: '无',
        solution: '无',
        stop: '无',
        odd: '无',
        email: 'KDLD30.WCD.wistron@wistron.com',
        del_id: undefined,
    }

    componentDidMount() {
        this.setState({
            HandoverDate: moment().format('YYYY-MM-DD'),
            dutyDate: this.now(this.props.location.state.classType)(),
            // email: this.email.input.value
        })
    }
    handleSubmit = async () => {
        const process_event = { ...this.state }
        try {
            await axios.post('http://10.62.22.249:8000/newEvent', process_event)
            message.success('发送成功')
            this.props.history.push({
                pathname: '/Home/TurnList',
            });
        } catch (error) {
            if (error) throw error
        }
    }

    onChange = (NodeType) => {
        return (date, dateString) => {
            this.setState({ [NodeType]: dateString })
        }
    }
    onchange = (value) => {
        console.log(value)
        this.setState({ stop: value })
    }

    FormDate = (NodeType) => {
        return event => {
            this.setState({ [NodeType]: event.target.value })
        };
    }

    now = (a) => {
        return () => {
            if (this.props.location.state.classType === '夜班') {
                const year_Month = moment().format('YYYY-MM')
                let day = moment().format('DD') - 1
                if (day < 10) {
                    day = '0' + day
                }
                return year_Month + '-' + day
            } else {
                return moment().format('YYYY-MM-DD')
            }
        }
    }
    render() {
        const props = {
            name: 'file',
            action: '/api/text',
            headers: {
                authorization: 'authorization-text',
            },
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
            progress: {
                strokeColor: {
                    '0%': '#108ee9',
                    '100%': '#87d068',
                },
                strokeWidth: 3,
                format: percent => `${parseFloat(percent.toFixed(2))}%`,
            },
        };
        return (
            <QueueAnim className="queue-simple">
                <Form className="ISP-form" tlayout={'inline'}>
                    <Title style={{ paddingTop: 20, marginLeft: 20 }} level={3}>交接记录</Title>
                    <Divider />
                    <Row className='Row'>
                        <Col span={2}>
                            <Form.Item label="班别" style={{ width: 120 }}>
                                {this.props.location.state.classType}
                            </Form.Item>
                        </Col>
                        <Col span={3}>
                            <Form.Item label="处理人" style={{ width: 120 }}>
                                {this.props.location.state.username}
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item label="班别日期" style={{ width: 200 }}>
                                <DatePicker defaultValue={moment(this.now(this.props.location.state.classType)())} onChange={this.onChange('dutyDate')} />
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item label="交接日期" style={{ width: 200 }}>
                                <DatePicker defaultValue={moment()} onChange={this.onChange('HandoverDate')} />
                            </Form.Item>
                        </Col>
                        <Col span={4} >
                            <Form.Item label="联络人" style={{ width: 160 }}>
                                <Input placeholder="无" onChange={this.FormDate('Contact')} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row className='Row'>
                        <Col span={6}>
                            <Form.Item label="异常事件" style={{ width: 260 }}>
                                <Input placeholder="无" onChange={this.FormDate('event')} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="异常影响" style={{ width: 260 }}>
                                <Input placeholder="无" onChange={this.FormDate('influence')} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="异常原因" style={{ width: 260 }}>
                                <Input placeholder="无" onChange={this.FormDate('reason')} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row className='Row'>
                        <Col span={6}>
                            <Form.Item label="有无停线" >
                                <Select
                                    ref={c => this.isStop = c}
                                    defaultValue='无'
                                    style={{ width: 90, height: 30 }}
                                    onChange={this.onchange}
                                >
                                    <Option value="无">无</Option>
                                    <Option value='有'>有</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="停线单号" style={{ width: 260 }}>
                                <Input placeholder="停线单号" onChange={this.FormDate('odd')} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="异常时间" style={{ width: 260 }}>
                                <Input placeholder="异常时间" onChange={this.FormDate('duration')} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row className='Row' type='flex'>
                        <Col span={7} >
                            <Form.Item label="email - To" style={{ maxWidth: 320 }}>
                                <Input ref={c => this.email = c} onChange={this.FormDate('email')} defaultValue="KDLD30.WCD.wistron@wistron.com" />
                            </Form.Item>
                        </Col>
                        <Col span={5} style={{marginTop:-10}}>
                            <Upload {...props} >
                                <Button icon={<UploadOutlined />}>上传附件</Button>
                            </Upload>
                        </Col>
                    </Row>
                    <Row className='Row' type='flex'>
                        <Col span={7} >
                            <Form.Item label="解决方案" style={{ width: 340 }}>
                                <TextArea autoSize={{ minRows: 2, maxRows: 5 }} showCount maxLength={100} onChange={this.FormDate('solution')} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row className='Row' justify='center'>
                        <Col span={6} >
                            <Button onClick={this.handleSubmit} style={{ width: 150 }} type='primary'>提交</Button>
                        </Col>
                    </Row>
                </Form >
            </QueueAnim>
        )
    }
}
