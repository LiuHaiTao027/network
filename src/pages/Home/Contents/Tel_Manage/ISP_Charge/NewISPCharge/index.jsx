import React, { Component } from 'react'
import { Form, Row, Col, DatePicker, Input, Button, Select, Divider, Typography, message } from 'antd';
import axios from 'axios'
import './index.css'
import TextArea from 'antd/lib/input/TextArea';
import QueueAnim from 'rc-queue-anim'
const { Title } = Typography;

const { Option } = Select;
const ISP = ['移动', '联通', '电信'];
const ISP_Data = {
    移动: ['Internet線路', '手機話費', 'DDN線路', '短信平台', 'NGN固話', '主管話費補助', '移动E1语音套餐', 'SDWAN'],
    联通: ['Internet線路', '手機話費', 'DDN線路', '短信平台', 'ADSL'],
    电信: ['Internet線路', 'ADSL', '生活區寬帶', '外派宿舍寬帶', '電信固話', '電信E1'],
};

export default class NewISPCharge extends Component {
    state = {
        OnOperator: ISP_Data[ISP[0]],
        pic: 'All',
        Operator: '移动',
        Business_types: ISP_Data[ISP[0]][0],
        year: '',
        bandwidth: '',
        month: '',
        money: '',
        paragraph_type: '',
        Payment_method: '',
        invoice_dueTime: '',
        invoice_arrived: '',
        PR: '',
        PO: '',
        PA: '',
        state: '',
        note: '',
    };

    handleProvinceChange = value => {
        this.setState({
            OnOperator: ISP_Data[value],
            Business_types: ISP_Data[value][0],
            Operator: value
        });
        console.log(value);
    };

    onSecondCityChange = value => {
        this.setState({
            Business_types: value,
        });
        console.log(value);
    };
    handleSubmit = async () => {
        const { pic, Operator, Business_types, year, bandwidth, month, money, paragraph_type, Payment_method, invoice_dueTime, invoice_arrived, PR, PO, PA, state, note } = this.state
        const newInfo = { pic, Operator, Business_types, year, bandwidth, month, money, paragraph_type, Payment_method, invoice_dueTime, invoice_arrived, PR, PO, PA, state, note }
        try {
            const result = await axios.post('/api/NewISPCharge', newInfo)
            console.log(await result.data);
            if (result.data === 'OK') {
                message.success('数据增加成功')
                this.props.history.push({
                    pathname: '/Home/ISP_Charge'
                })
            }
        } catch (error) {

        }
    }
    handleMoney = (event) => {
        this.setState({ money: event.target.value })
    }
    bandwidth = (event) => {
        this.setState({ bandwidth: event.target.value })
    }
    onChange = (typeNode) => {
        return (date, dateString) => {
            if (typeNode === 'year') {
                this.setState({ year: dateString })
            }
            else if (typeNode === 'month') {
                this.setState({ month: dateString })
            }
            else if (typeNode === 'invoice_dueTime') {
                this.setState({ invoice_dueTime: dateString })
            }
            else if (typeNode === 'invoice_arrived') {
                this.setState({ invoice_arrived: dateString })
            }
            else if (typeNode === 'state') {
                this.setState({ state: dateString.value })
            }
            else if (typeNode === 'pic') {
                this.setState({ pic: dateString.value })
            }
            else if (typeNode === 'paragraph_type') {
                this.setState({ paragraph_type: dateString.value })
            }
            else if (typeNode === 'Payment_method') {
                this.setState({ Payment_method: dateString.value })
            }
            else if (typeNode === 'PR') {
                this.setState({ PR: date.target.value })
            }
            else if (typeNode === 'PO') {
                this.setState({ PO: date.target.value })
            }
            else if (typeNode === 'PA') {
                this.setState({ PA: date.target.value })
            }
            else if (typeNode === 'note') {
                this.setState({ note: date.target.value })
            }
        }
    }
    render() {
        const { OnOperator } = this.state;
        return (
            <QueueAnim className="queue-simple">
                <Form className="ISP-form" tlayout={'inline'}>
                    <Title style={{ paddingTop: 20, marginLeft: 20 }} level={3}>ISPCharge</Title>
                    <Divider />
                    <Row className='Row'>
                        <Col span={6}>
                            <Form.Item label='年份' className='Item'>
                                <DatePicker onChange={this.onChange('year')} picker="year" />
                                {/* <MonthPicker style={{ width: 135 }} placeholder="Select Month" /> */}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label='月份' className='Item'>
                                <DatePicker onChange={this.onChange('month')} picker="month" format={'M'} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label='状态' className='Item'>
                                <Select
                                    style={{ width: 150 }}
                                    placeholder="Please select"
                                    onChange={this.onChange('state')}
                                >
                                    <Option key='待请款' value='待请款'>待请款</Option>
                                    <Option key='PR签核中' value='PR签核中'>PR签核中</Option>
                                    <Option key='PA簽核中' value='PA簽核中'>PA簽核中</Option>
                                    <Option key='PA已完無發票' value='PA已完無發票'>PA已完無發票</Option>
                                    <Option key='完成' value='完成'>完成</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row className='Row'>
                        <Col span={6} >
                            <Form.Item label='运营商' className='Item'>
                                <Select
                                    defaultValue={ISP[0]}
                                    style={{ width: 135 }}
                                    onChange={this.handleProvinceChange}
                                >
                                    {ISP.map(province => (
                                        <Option key={province}>{province}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label='业务类型' className='Item'>
                                <Select
                                    mode="multiple"
                                    style={{ maxwidth: 400 }}
                                    placeholder="Please select"
                                    onChange={this.onSecondCityChange}
                                >
                                    {OnOperator.map(city => (
                                        <Option key={city}>{city}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label='PIC' className='Item'>
                                <Select
                                    style={{ width: 120 }}
                                    placeholder="Please select"
                                    onChange={this.onChange('pic')}
                                >
                                    <Option key='叶健' value='叶健'>叶健</Option>
                                    <Option key='周永杰' value='周永杰'>周永杰</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row className='Row'>
                        <Col span={6}>
                            <Form.Item className='Item' label='请款类型'>
                                <Select
                                    style={{ width: 120 }}
                                    placeholder="Please select"
                                    onChange={this.onChange('paragraph_type')}
                                >
                                    <Option key='请款' value='请款'>请款</Option>
                                    <Option key='冲销' value='冲销'>冲销</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item className='Item' label='付款方式'>
                                <Select
                                    style={{ width: 120 }}
                                    placeholder="Please select"
                                    onChange={this.onChange('Payment_method')}
                                >
                                    <Option key='年度付款' value='年度付款'>年度付款</Option>
                                    <Option key='季度付款' value='季度付款'>季度付款</Option>
                                    <Option key='月度付款' value='月度付款'>月度付款</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item className='Item' label='金额'>
                                <Input style={{ maxWidth: 150 }} onChange={this.handleMoney} prefix="￥" suffix="RMB" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row className='Row' type='flex'>
                        <Col span={6} >
                            <Form.Item className='Item' label='带宽' style={{ maxWidth: 200 }} onChange={this.bandwidth}>
                                <Input suffix="M"></Input>
                            </Form.Item>
                        </Col>
                        <Col span={6} >
                            <Form.Item className='Item' label='发票应到时间'>
                                <DatePicker onChange={this.onChange('invoice_dueTime')} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item className='Item' label='发票实到时间'>
                                <DatePicker onChange={this.onChange('invoice_arrived')} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row className='Row'>
                        <Col span={6}>
                            <Form.Item className='Item' label='PR'>
                                <Input onChange={this.onChange('PR')} style={{ maxWidth: 200 }} placeholder='please input'></Input>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item className='Item' label='PO'>
                                <Input onChange={this.onChange('PO')} style={{ maxWidth: 200 }} placeholder='please input'></Input>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item className='Item' label='PA'>
                                <Input onChange={this.onChange('PA')} style={{ maxWidth: 200 }} placeholder='please input'></Input>
                            </Form.Item>
                        </Col>
                    </Row>
                    <TextArea onBlur={this.onChange('note')} rows={6} className='note' placeholder="备注：" />
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
