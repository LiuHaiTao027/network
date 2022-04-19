import React, { useState, useEffect } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Typography, message, Button, Spin } from 'antd';
import axios from 'axios';
// import { Route} from "react-router-dom";

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
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
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

const EditableTable = (props) => {
    const [form] = Form.useForm();
    const [data, setData] = useState(originData);
    const [editingKey, setEditingKey] = useState('');
    const [isLoading, setLoading] = useState(false)
    const isEditing = (record) => record.key === editingKey;
    const getInfo = async () => {
        const info = []
        try {
            setLoading(true)
            const result = await axios.post('/api/ISP_Charge')
            result.data.forEach((item) => {
                info.push({ ...item, key: item._id })
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


    const edit = (record) => {
        form.setFieldsValue({
            ...record,
        });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                const result = await axios.post('/api/updateISP_Charge', newData)
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
            title: '年份',
            dataIndex: 'year',
            // key: 'year',
            editable: true,
            width: '6%'
        },
        {
            title: '運營商',
            dataIndex: 'Operator',
            // key: 'Operator',
            editable: true,
            filters: [
                {
                    text: '移动',
                    value: '移动'
                },
                {
                    text: '联通',
                    value: '联通'
                },
                {
                    text: '电信',
                    value: '电信'
                }
            ],
            onFilter: (value, record) => {
                if (value === '移动') {
                    return record.Operator === '移动'
                } else if (value === '联通') {
                    return record.Operator === '联通'
                } else if (value === '电信') {
                    return record.Operator === '电信'
                }
            }
        },
        {
            title: '业务类型',
            dataIndex: 'Business_types',
            key: 'Business_types',
            editable: true,
        },

        {
            title: '帶寬',
            dataIndex: 'bandwidth',
            key: 'bandwidth',
            editable: true,
        },
        {
            title: '月份',
            dataIndex: 'month',
            key: 'month',
            editable: true,
        },
        {
            title: '金額',
            dataIndex: 'money',
            key: 'money',
            editable: true,
        },
        {
            title: '請款類型',
            dataIndex: 'paragraph_type',
            key: 'paragraph_type',
            editable: true,
        },
        {
            title: '付費方式',
            dataIndex: 'Payment_method',
            key: 'Payment_method',
            editable: true,
        },
        {
            title: '發票應到時間',
            dataIndex: 'invoice_dueTime',
            key: 'invoice_dueTime',
            editable: true,
        },
        {
            title: '發票實到時間',
            dataIndex: 'invoice_arrived',
            key: 'invoice_arrived',
            editable: true,
        },
        {
            title: 'PR',
            dataIndex: 'PR',
            key: 'PR',
            editable: true,
        },
        {
            title: 'PO',
            dataIndex: 'PO',
            key: 'PO',
            editable: true,
        },
        {
            title: 'PA',
            dataIndex: 'PA',
            key: 'PA',
            editable: true,
        },
        {
            title: '狀態',
            dataIndex: 'state',
            key: 'state',
            width: 130,
            fixed: 'right',
            editable: true,
            filters: [{
                text: '完成',
                value: '完成',
            }, {
                text: '待请款',
                value: '待请款',
            },
            {
                text: 'PR簽核中',
                value: 'PR簽核中',
            },
            {
                text: 'PA簽核中',
                value: 'PA簽核中',
            },
            {
                text: 'PA已完無發票',
                value: 'PA已完無發票',
            },
            ],
            onFilter(value, record) {
                if (value === '完成') {
                    return record.state === '完成'
                } else if (value === '待请款') {
                    return record.state === '待请款'
                } else if (value === 'PR簽核中') {
                    return record.state === 'PR簽核中'
                } else if (value === 'PA簽核中') {
                    return record.state === 'PA簽核中'
                } else if (value === 'PA已完無發票') {
                    return record.state === 'PA已完無發票'
                }
            },
            render: function (text, record) {
                if (record.state === '完成') {
                    return <div style={{ color: "Green", fontWeight: 'bold' }}>完成</div>
                } else if (record.state === '待请款') {
                    return <div style={{ color: "red", fontWeight: 'bold' }}>待请款</div>
                } else if (record.state === 'PR簽核中') {
                    return <div style={{ color: "#ffe699", fontWeight: 'bold' }}>PR簽核中</div>
                } else if (record.state === 'PA簽核中') {
                    return <div style={{ color: "#f4b084", fontWeight: 'bold' }}>PA簽核中</div>
                } else if (record.state === 'PA已完無發票') {
                    return <div style={{ color: "#c6e0b4", fontWeight: 'bold' }}>PA已完無發票</div>
                }
            },

        },
        {
            title: '备注',
            dataIndex: 'note',
            key: 'note',
            fixed: 'right',
            editable: true,
            ellipsis: true,
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
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        Edit
                    </Typography.Link>
                );
            },
        },
    ]
    const NewISPCharge = () => {
        props.history.push({
            pathname: '/Home/NewISPCharge',
        })
    }
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                // inputType: col.dataIndex === 'age' ? 'number' : 'text',
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
                        expandedRowRender: record => <div style={{ margin: 0 }}>
                            <p >备注：{record.note}</p>
                        </div>,
                        rowExpandable: record => record.event !== 'Not Expandable',
                    }}
                    title={(record) => {
                        let count1 = 0;
                        let count2 = 0;
                        let count3 = 0;
                        let count4 = 0;
                        let count5 = 0;
                        data.forEach((element) => {
                            if (element.state === '完成') {
                                count1 += 1
                            } else if (element.state === '待请款') {
                                count2 += 1
                            } else if (element.state === 'PR簽核中') {
                                count3 += 1
                            } else if (element.state === 'PA簽核中') {
                                count4 += 1
                            } else if (element.state === 'PA已完無發票') {
                                count5 += 1
                            }
                        })
                        return (
                            <div>
                                <span style={{ fontWeight: 'bold', fontSize: 16 }}>
                                    当前已完成: <span style={{ color: 'green', textDecoration: 'underline' }}>{count1}</span>
                                    &nbsp;&nbsp;
                                    待请款: <span style={{ color: 'red', textDecoration: 'underline' }}>{count2}</span>
                                    &nbsp;&nbsp;
                                    PR签核中: <span style={{ color: 'red', textDecoration: 'underline' }}>{count3}</span>
                                    &nbsp;&nbsp;
                                    PA签核中: <span style={{ color: 'red', textDecoration: 'underline' }}>{count4}</span>
                                    &nbsp;&nbsp;
                                    PA已完无发票: <span style={{ color: 'red', textDecoration: 'underline' }}>{count5}</span>
                                </span>
                                <Button onClick={NewISPCharge} type="primary" style={{ float: "right", marginRight: 20 }}>New</Button>
                                {/* <Link to={{pathname:'/Home/NewISPCharge'}}>New</Link> */}
                            </div>
                        )
                    }}
                />
            </Form>
        </Spin>
    );
};

export default EditableTable