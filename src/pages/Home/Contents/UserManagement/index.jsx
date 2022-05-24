import { useState, useEffect } from 'react';
import { Table, Space, message, Button, Divider, Modal, Form, Row, Col, Input, Select } from 'antd';
import axios from 'axios';

const { Option } = Select;

const origindata = [];
const userinfo = {
    name: '',
    workNumber: '',
    email: '',
    permission: '',
    password: ''
}

function UserManagement(props) {
    const [data, setData] = useState(origindata)
    const [permission, setPermission] = useState(false)
    const [loading, setloading] = useState(false)
    const [visible, setvisible] = useState(false)
    const [newUser, setNewUser] = useState(userinfo)
    const [canEdit, setCanEdit] = useState(true)

    const getUsers = async () => {
        const newOrigindata = []
        try {
            const result = await axios.post('/api/usersInfo')
            result.data.forEach((item) => {
                newOrigindata.push({ ...item, key: item._id })
            })
            setData(newOrigindata)
        } catch (error) {
            message.error('请检查网络或者更换浏览器')
        }
    }

    useEffect(() => {
        getUsers()
    }, []);

    useEffect(() => {
        data.forEach((item) => {
            if (item.name === localStorage.getItem('username')) {
                if (item.permission !== 'admin') {
                    setPermission(true)
                }
            }
        })
    }, [data]);
    useEffect(() => {
        data.forEach((item) => {
            if (item.name === localStorage.getItem('username')) {
                setCanEdit(false)
                // if (item.permission !== 'admin') {
                //     setPermission(true)
                // }
            }
        })

    })

    const showModal = () => {
        setvisible(true)
        // visible: true,
    };

    const handleOk = async () => {
        console.log(newUser);
        setloading(true)
        try {
            // const result = await axios.post('/api/newUser', newUser)
            // if (result === 'OK') {
            //     setloading(false)
            //     setloading(false)
            //     message.success('信息插入成功')
            // }
        } catch (error) {
            message.error('网络连接错误')
        }

        // setTimeout(() => {
        //     setloading(false)
        //     setloading(false)
        // }, 3000);
    };

    const handleCancel = () => {
        setvisible(false)
    };

    const getNewuser = (NodeType) => {
        return (event) => {
            if (NodeType === 'name') {
                userinfo.name = event.target.value
                setNewUser(userinfo)
            } else if (NodeType === 'workNumber') {
                userinfo.workNumber = event.target.value
                setNewUser(userinfo)
            } else if (NodeType === 'email') {
                userinfo.email = event.target.value
                setNewUser(userinfo)
            } else if (NodeType === 'permissions') {
                userinfo.permission = event.target.value
                setNewUser(userinfo)
            } else if (NodeType === 'password') {
                userinfo.password = event.target.value
                setNewUser(userinfo)
            }
        }
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            // render: text => <a>{text}</a>,
        },
        {
            title: 'workNumber',
            dataIndex: 'workNumber',
            key: 'workNumber',
        },
        {
            title: 'permission',
            dataIndex: 'permission',
            key: 'permission',
        },
        {
            title: 'email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => {
                const name = localStorage.getItem('username')
                if (record.name === name) {
                    return (
                        <Space size="middle">
                            <Button disabled={canEdit} type="primary">编辑</Button>
                            <Divider type="vertical" />
                            <Button disabled={canEdit} type="primary" danger>删除</Button>
                        </Space>
                    )
                } else {
                    return (
                        <Space size="middle">
                            <Button disabled={permission} type="primary">编辑</Button>
                            <Divider type="vertical" />
                            <Button disabled={permission} type="primary" danger>删除</Button>
                        </Space>
                    )
                }
            }
        }
    ];



    return (
        <Table
            style={{ marginTop: 30 }}
            columns={columns}
            dataSource={data}
            bordered
            title={(record) => {
                return (
                    <div>
                        <span style={{ fontWeight: 'bold', fontSize: 16 }}>
                            用户管理
                        </span>
                        <>
                            <Button type="primary" onClick={showModal} disabled={permission} style={{ float: "right", marginRight: 20 }}>
                                New
                            </Button>
                            <Modal
                                visible={visible}
                                title="新增用户"
                                onOk={handleOk}
                                onCancel={handleCancel}
                                footer={[
                                    <Button key="back" onClick={handleCancel}>
                                        Return
                                    </Button>,
                                    <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                                        Submit
                                    </Button>,
                                ]}
                            >
                                <Form
                                    autoComplete="off"
                                >
                                    <Row>
                                        <Col >
                                            <Form.Item
                                                label="用户名"
                                                name='username'
                                                rules={
                                                    [
                                                        { required: true, message: 'Please input your username!' }
                                                    ]
                                                }
                                            >
                                                <Input onChange={getNewuser('name')} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col >
                                            <Form.Item
                                                label="密码"
                                                name='password'
                                                rules={
                                                    [
                                                        { required: true, message: 'Please input your password!' }
                                                    ]
                                                }
                                            >
                                                <Input onChange={getNewuser('password')} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Item
                                                label="工号"
                                                name='workNumber'
                                                rules={[{ required: true, message: 'Please input your workNumber!' }]}
                                            >
                                                <Input onChange={getNewuser('workNumber')} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Item
                                                label="邮件"
                                                name='email'
                                                rules={[{ required: true, message: 'Please input your email!' }]}
                                            >
                                                <Input onChange={getNewuser('email')} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Item
                                                label="权限"
                                                name='permissions'
                                                rules={[{ required: true, message: 'Please choose the permissions!' }]}
                                            >
                                                {/* <Input onChange={getNewuser('permissions')} /> */}
                                                <Select
                                                    style={{ width: 120, height: '100%' }}
                                                    onChange={getNewuser('permissions')}

                                                >
                                                    <Option key='admin' value="admin">admin</Option>
                                                    <Option key='user' value="admin">user</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form>
                            </Modal>
                        </>
                    </div>
                )
            }}
        />
    )
}

export default UserManagement