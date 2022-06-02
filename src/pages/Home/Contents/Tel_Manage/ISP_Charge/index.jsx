import React, { useState, useEffect } from 'react';
import { Table, Input, Popconfirm, Form, Typography, message, Button, Spin, Select } from 'antd';
import axios from 'axios';
const { Option } = Select

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
    const inputNode =
        title === '狀態' ?
            <Select children={[
                <Option key='Done' value='完成'>完成</Option>,
                <Option key='ongoing1' value='待请款'>待请款</Option>,
                <Option key='ongoing2' value='PR簽核中'>PR簽核中</Option>,
                <Option key='ongoing3' value='PA簽核中'>PA簽核中</Option>,
                <Option key='ongoing4' value='PA已完無發票'>PA已完無發票</Option>,
            ]} /> : <Input />
                &&
                title === 'pic' ?
                <Select children={[
                    <Option key='roy_ye' value='roy_ye'>叶健</Option>,
                    <Option key='Daniel_YJ_Zhou' value='Daniel_YJ_Zhou'>周永杰</Option>,
                ]} /> : <Input />
                    &&
                    title === '付費方式' ?
                    <Select children={[
                        <Option key='年度付款' value='年度付款'>年度付款</Option>,
                        <Option key='季度付款' value='季度付款'>季度付款</Option>,
                        <Option key='月度付款' value='月度付款'>月度付款</Option>,
                    ]} /> : <Input />
                    &&
                    title === '請款類型' ?
                    <Select children={[
                        <Option key='请款' value='请款'>请款</Option>,
                        <Option key='冲销' value='冲销'>冲销</Option>,
                        <Option key='预请款' value='预请款'>预请款</Option>,
                    ]} /> : <Input />;
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
            const result = await axios.post('http://10.62.22.249:8000/ISP_Charge')
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
                const result = await axios.post('http://10.62.22.249:8000/updateISP_Charge', newData)
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
            // editable: true,
            width: '6%',
            fixed: 'left',
        },
        {
            title: '運營商',
            dataIndex: 'Operator',
            fixed: 'left',
            // key: 'Operator',
            // editable: true,
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
            fixed: 'left',
            // editable: true,
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
            // editable: true,
            filters: [
                { text: '1月', value: 1 },
                { text: '2月', value: 2 },
                { text: '3月', value: 3 },
                { text: '4月', value: 4 },
                { text: '5月', value: 5 },
                { text: '6月', value: 6 },
                { text: '7月', value: 7 },
                { text: '8月', value: 8 },
                { text: '9月', value: 9 },
                { text: '10月', value: 10 },
                { text: '11月', value: 11 },
                { text: '12月', value: 12 },
            ],
            onFilter: (value, record) => {
                switch (true) {
                    case value === 1:
                        return record.month === '1'
                    case value === 2:
                        return record.month === '2'
                    case value === 3:
                        return record.month === '3'
                    case value === 4:
                        return record.month === '4'
                    case value === 5:
                        return record.month === '5'
                    case value === 6:
                        return record.month === '6'
                    case value === 7:
                        return record.month === '7'
                    case value === 8:
                        return record.month === '8'
                    case value === 9:
                        return record.month === '9'
                    case value === 10:
                        return record.month === '10'
                    case value === 11:
                        return record.month === '11'
                    case value === 12:
                        return record.month === '12'
                    default:
                        break;
                }
            },
            // sorter:(a, b)=>{+a.month - b.month}
            // defaultSortOrder: 'descend', // 默认倒序
            defaultSortOrder: 'ascend', // 默认正序
            sorter: (a, b) => a.month - b.month,
        },
        {
            title: '金額(RMB)',
            dataIndex: 'money',
            key: 'money',
            editable: true,
        },
        {
            title: '請款類型',
            dataIndex: 'paragraph_type',
            key: 'paragraph_type',
            editable: true,
            filters: [
                {
                    text: '请款',
                    value: '请款'
                },
                {
                    text: '冲销',
                    value: '冲销'
                },
                {
                    text: '预请款',
                    value: '预请款'
                }
            ],
            onFilter: (value, record) => {
                if (value === '请款') {
                    return record.paragraph_type === '请款'
                } else if (value === '冲销') {
                    return record.paragraph_type === '冲销'
                } else if (value === '预请款') {
                    return record.paragraph_type === '预请款'
                }
            }
        },
        {
            title: '付費方式',
            dataIndex: 'Payment_method',
            key: 'Payment_method',
            editable: true,
            filters: [
                {
                    text: '年度付款',
                    value: '年度付款'
                },
                {
                    text: '季度付款',
                    value: '季度付款'
                },
                {
                    text: '月度付款',
                    value: '月度付款'
                }
            ],
            onFilter: (value, record) => {
                if (value === '年度付款') {
                    return record.Payment_method === '年度付款'
                } else if (value === '季度付款') {
                    return record.Payment_method === '季度付款'
                } else if (value === '月度付款') {
                    return record.Payment_method === '月度付款'
                }
            }
        },
        {
            title: '發票應到時間',
            dataIndex: 'invoice_dueTime',
            key: 'invoice_dueTime',
            // editable: true,
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
            title: 'pic',
            dataIndex: 'pic',
            key: 'pic',
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
                            <a href='/'>Cancel</a>
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
                                <Button disabled={true} onClick={NewISPCharge} type="primary" style={{ float: "right", marginRight: 20 }}>resetAll</Button>
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