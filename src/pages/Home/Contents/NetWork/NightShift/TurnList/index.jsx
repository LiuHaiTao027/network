import React, { useState, useEffect } from 'react';
import { Table, Input, Popconfirm, Form, Typography, message, Spin, Select, Divider, Button } from 'antd';
import axios from 'axios';
import _ from 'lodash'
import { DownloadOutlined } from '@ant-design/icons';
// import { Route} from "react-router-dom";
const { Option } = Select;

const originData = [];

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = title === '有无停线' ?
        <Select children={[<Option key='is' value='有'>有</Option>, <Option key='not' value='無'>無</Option>]} /> :
        <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const TurnList = (props) => {
    const [form] = Form.useForm();
    const [data, setData] = useState(originData);
    const [filiter, setFiliter] = useState(data)
    const [editingKey, setEditingKey] = useState('');
    const [isLoading, setLoading] = useState(false)
    const isEditing = (record) => record.key === editingKey;
    const getInfo = async () => {
        const info = []
        try {
            setLoading(true)
            const result = await axios.get('http://10.62.22.249:8000/event')
            result.data.forEach((item, index) => {
                info.push({ ...item, key: index })
            })
            setData(info)
            setLoading(false)
        } catch (error) {
            message.error('请检查网络或者更换浏览器')
        }
    }

    useEffect(() => {
        getInfo()
    }, []);

    useEffect(() => {
        const getFiliter = () => {
            const newFIliter = []
            data.forEach((i) => {
                newFIliter.push({ text: i.people, value: i.people })
            })
            setFiliter(_.uniqWith(newFIliter, _.isEqual))
        }
        getFiliter()
    }, [data])


    const edit = (record) => {
        form.setFieldsValue({
            ...record,

        });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const DownLoad = async (key) => {
        const newData = [...data];
        const index = newData.findIndex((item) => key === item.key);
        const dutyName = { dutyName: newData[index].dutyDate }
        try {
            
            const result = await axios.post('http://10.62.22.249:8000/Findtext', dutyName)
            if (result.status >= 200 && result.status < 300) {
                message.success('下载成功')
            }else{
                message.error('no such file or directory')
            }
        } catch (error) {
            if (error) {
                message.error('no such file or directory')
            }
        }

    }

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                const result = await axios.post('http://10.62.22.249:8000/update_Event', newData)
                if (result.data === 'OK') {
                    message.success('更新成功')
                    setData(newData);
                    setEditingKey('');
                } else {
                    message.error('请检查网络连接是否正常')
                }
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            message.error('请检查填写内容是否符合规范')
            console.log('Validate Failed:', errInfo);
        }
    };
    const columns = [
        {
            title: '班别',
            width: 100,
            dataIndex: 'classType',
            // key: 'classType',
            editable: true,
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
            editable: true,
            // key: 'dutyDate',
        },
        {
            title: '交接日期',
            width: 100,
            dataIndex: 'HandoverDate',
            editable: true,
            // key: 'HandoverDate',
        },
        {
            title: '处理人',
            dataIndex: 'people',
            editable: true,
            // key: 'people',
            width: 150,
            filters: [...filiter],
            onFilter(value, record) {
                if (value === record.people) return record.people
            },
        },
        {
            title: '联络人',
            dataIndex: 'Contact',
            editable: true,
            // key: 'Contact',
            width: 150,
        },
        {
            title: '异常持续时间',
            dataIndex: 'duration',
            editable: true,
            // key: 'duration',
            width: 150,
        },
        {
            title: '异常事件',
            dataIndex: 'event',
            editable: true,
            // key: 'event',
            width: 150,
            ellipsis: true,
        },
        {
            title: '异常影响',
            dataIndex: 'influence',
            editable: true,
            // key: 'influence',
            width: 150,
            ellipsis: true,
        },
        {
            title: '异常原因',
            dataIndex: 'reason',
            editable: true,
            // key: 'reason',
            width: 150,
            ellipsis: true,
        },
        {
            title: '解决方案',
            dataIndex: 'solution',
            editable: true,
            // key: 'solution',
            width: 150,
            ellipsis: true,
        },
        {
            title: '有无停线',
            dataIndex: 'stop',
            editable: true,
            // key: 'stop'
        },
        {
            title: '停线单号',
            dataIndex: 'odd',
            editable: true,
            // key: 'odd'
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            fixed: 'right',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => save(record.key)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Save
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a href='/'>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <span>
                        <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                            Edit
                        </Typography.Link>
                        <Divider type="vertical" />
                        <Button onClick={() => DownLoad(record.key)} icon={<DownloadOutlined />}>下载</Button>
                    </span>

                );
            },
        },
    ]


    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });
    return (
        <Spin spinning={isLoading} size='large' >
            <Form form={form} component={false} >
                <Table
                    style={{ marginTop: 30 }}
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    bordered
                    dataSource={data}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: cancel,
                    }}
                    scroll={{ x: 2000, y: 500 }}
                    expandable={{
                        expandedRowRender: record =>
                            <div style={{ margin: 0 }}>
                                <p style={{ borderBottom: 'solid 1px black' }}>异常事件：{record.event}</p>
                                <p style={{ borderBottom: 'solid 1px black' }}>异常原因：{record.reason}</p>
                                <p style={{ borderBottom: 'solid 1px black' }}>解决方案：{record.solution}</p>
                            </div>,
                        rowExpandable: record => record.event !== 'Not Expandable',
                    }}
                    title={(record) => {
                        return (
                            <div>
                                白夜班交接
                            </div>
                        )
                    }}
                />
            </Form>
        </Spin>
    );
};

export default TurnList