import React, { Component } from 'react'
import { Form, Row, Col, Input, Button, Divider, Typography, message, Select, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios'
import './index.css'
import QueueAnim from 'rc-queue-anim'

const { Title } = Typography;

const { Option } = Select;

class NewTurnClass extends Component {
    state = {
        user: [],
        turnEffect: [],
        userMail: '',
        effectObj: {}
    }

    onFinish = (values) => {
        // effectObj.
        console.log(values);

    };

    handlemail = (key, userArr) => {
        const {turnEffect} = this.state
        userArr.forEach((item)=>{
            turnEffect.push({...item})
        })
        this.setState({turnEffect})
    }

    async componentDidMount() {
        const newUser = []

        const result = await axios.post('/api/username')

        result.data.forEach(element => {
            newUser.push({ ...element })
        });

        this.setState({ user: newUser })

    }

    render() {
        console.log(this.turnEffect);
        const { user } = this.state
        return (
            <QueueAnim className="queue-simple">
                <Form name="dynamic_form_nest_item" onFinish={this.onFinish} autoComplete="off" style={{ padding: 15, marginTop: 30, background: '#fff' }}>
                    <Title style={{ paddingTop: 20, marginLeft: 20 }} level={3}>转班交接</Title>
                    <Divider />
                    <Form.List name="effects" >
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Space
                                        key={key}
                                        style={{
                                            display: 'flex',
                                            marginBottom: 8,
                                        }}
                                        align="baseline"
                                    >
                                        <Row style={{ display: 'inlineBlock' }}>
                                            <Col style={{ marginRight: 20 }}>
                                                <Form.Item
                                                    label='交接PIC'
                                                >
                                                    {localStorage.getItem('username')}
                                                </Form.Item>
                                            </Col>
                                            <Col style={{ marginRight: 20 }}>
                                                <Form.Item
                                                    label='交接事件'
                                                    {...restField}
                                                    name={[name, 'effect']}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Missing Effect',
                                                        },
                                                    ]}
                                                >
                                                    <Input placeholder="please input" />
                                                </Form.Item>
                                            </Col>
                                            <Col style={{ marginRight: 100 }}>
                                                <Form.Item
                                                    style={{ width: 150 }}
                                                    label='PIC'
                                                >
                                                    <Select
                                                        mode="multiple"
                                                        allowClear
                                                        style={{
                                                            width: 200,
                                                        }}
                                                        placeholder="Please select"
                                                        onChange={this.handlemail}
                                                    >
                                                        {user.map((item) => {
                                                            return (
                                                                <Option key={item._id}>{item.name}</Option>
                                                            )
                                                        })}
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col style={{ marginRight: 20 }}>
                                                <Form.Item
                                                    label='备注'
                                                    name={[name, 'note']}
                                                    {...restField}
                                                >
                                                    <Input placeholder="please input" />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                    </Space>
                                ))}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                        Add field
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </QueueAnim>
        );
    }
}

export default NewTurnClass;