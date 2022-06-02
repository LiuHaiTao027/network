import React, { useState, useEffect } from 'react';
import { Table, Input, Popconfirm, Form, Typography, message, Button, Spin, Select } from 'antd';
import axios from 'axios';
import _ from 'lodash'
const { Option } = Select;

const originData = [];
const { Search } = Input;
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
    const inputNode = title === '设备异动状态' ?
        <Select children={[
            <Option key='需转出-已转'>需转出-已转</Option>,
            <Option key='需转出-未转'>需转出-未转</Option>,
            <Option key='无需转出'>无需转出</Option>,
            <Option key='新购无财编'>新购无财编</Option>,
            <Option key='新购有财编'>新购有财编</Option>,
        ]} /> :
        <Input />
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

const EquipmentUsed = (props) => {
    const [form] = Form.useForm();
    const [data, setData] = useState(originData);
    const [editingKey, setEditingKey] = useState('');
    const [filiter, setFiliter] = useState(data)
    const [isLoading, setLoading] = useState(false)
    const [searchLoadinga, setsearchLoadinga] = useState(false)
    const [searchLoadingb, setsearchLoadingb] = useState(false)
    const isEditing = (record) => record.key === editingKey;
    const getInfo = async () => {
        const info = []
        try {
            setLoading(true)
            const result = await axios.post('http://10.62.22.249:8000/getEquipmentUsed')
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

    useEffect(() => {
        const getFiliter = () => {
            const newFIliter = []
            data.forEach((i) => {
                newFIliter.push({ text: i.recorder, value: i.recorder })
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


    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);

            if (index > -1) {
                const item = newData[index];
                item.editors = localStorage.getItem('username')
                newData.splice(index, 1, { ...item, ...row });
                const result = await axios.post('http://10.62.22.249:8000/update_EquipmentUsed', newData)
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
            // console.log('Validate Failed:', errInfo);
        }
    };
    const columns = [
        {
            title: '日期',
            dataIndex: 'date',
            editable: true,
            width: '6%'
        },
        {
            title: 'IP地址',
            dataIndex: 'IP',
            editable: true,
        },
        {
            title: '原位置',
            dataIndex: 'original_location',
            key: 'original_location',
            editable: true,
        },

        {
            title: '使用位置',
            dataIndex: 'Use_location',
            key: 'Use_location',
            editable: true,
        },
        {
            title: '记录人',
            dataIndex: 'recorder',
            key: 'recorder',
            editable: true,
            filters: [...filiter],
            onFilter(value, record) {
                if (value === record.recorder) return record.recorder
            },
        },
        {
            title: '财编',
            dataIndex: 'property_number',
            key: 'property_number',
            editable: true,
        },
        {
            title: '序列号',
            dataIndex: 'serial_number',
            key: 'serial_number',
            editable: true,
        },
        {
            title: '设备型号',
            dataIndex: 'model',
            key: 'model',
            editable: true,
        },

        {
            title: '编辑者',
            dataIndex: 'editors',
            key: 'editors',
            // editable: true,
        },
        {
            title: '设备异动状态',
            dataIndex: 'isRoll_out',
            key: 'isRoll_out',
            editable: true,
            fixed: 'right',
            filters: [
                {
                    text: '需转出-已转',
                    value: '需转出-已转'
                },
                {
                    text: '需转出-未转',
                    value: '需转出-未转'
                },
                {
                    text: '无需转出',
                    value: '无需转出'
                },
                {
                    text: '新购有财编',
                    value: '新购有财编'
                },
                {
                    text: '新购无财编',
                    value: '新购无财编'
                },
            ],
            onFilter(value, record) {
                if (value === '需转出-已转') {
                    return record.isRoll_out === '需转出-已转'
                } else if (value === '需转出-未转') {
                    return record.isRoll_out === '需转出-未转'
                } else if (value === '无需转出') {
                    return record.isRoll_out === '无需转出'
                } else if (value === '新购有财编') {
                    return record.isRoll_out === '新购有财编'
                } else if (value === '新购无财编') {
                    return record.isRoll_out === '新购无财编'
                }
                console.log('value', value);
                console.log('record', record);
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
            pathname: '/Home/NewEquipmentUsed',
        })
    }

    const handleIsRoll_out = (record) => {
        const newData = []
        return () => {
            record.forEach((obj) => {
                if (obj.isRoll_out === '否') {
                    newData.push(obj)
                }
            })
            setData(newData)
        }
    }

    const onSearch = async (value) => {
        const selectInfo = []
        setsearchLoadinga(true)
        const fatchData = { tag: 'property', key: value }
        const newData = await axios.post('http://10.62.22.249:8000/selectData', fatchData)
        newData.data.forEach((item) => {
            selectInfo.push({ ...item, key: item._id })
        })
        setData(selectInfo)
        setsearchLoadinga(false)
    }

    const onSearchIP = async (value) => {
        const selectInfo = []
        setsearchLoadingb(true)
        const fatchData = { tag: 'IP', key: value }
        const newData = await axios.post('http://10.62.22.249:8000/selectData', fatchData)
        newData.data.forEach((item) => {
            selectInfo.push({ ...item, key: item._id })
        })
        setData(selectInfo)
        setsearchLoadingb(false)
    }

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
                        expandedRowRender: record => <div style={{ margin: 0 }}>
                            <p >备注：{record.note}</p>
                        </div>,
                        rowExpandable: record => record.event !== 'Not Expandable',
                    }}
                    title={(record) => {
                        let count1 = 0;
                        let count2 = 0;
                        data.forEach((element) => {
                            if (element.isRoll_out === '需转出-已转') {
                                count2 += 1
                            } if (element.isRoll_out === '需转出-未转') {
                                count1 += 1
                            }
                        })
                        return (
                            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                <span style={{ fontWeight: 'bold', fontSize: 16 }}>
                                    设备已转出: <span style={{ color: 'green', textDecoration: 'underline' }}>{count2}</span>
                                    &nbsp;&nbsp;
                                    设备未转出: <span onClick={handleIsRoll_out(record)} style={{ color: 'red', textDecoration: 'underline', cursor: 'pointer' }}>{count1}</span>
                                </span>
                                <Search
                                    style={{ float: "right", width: 300, marginRight: 20 }}
                                    placeholder="财编查询"
                                    enterButton="Search"
                                    size="middle"
                                    allowClear
                                    loading={searchLoadingb}
                                    onSearch={onSearch}
                                />
                                <Search
                                    style={{ float: "right", width: 300, marginRight: 20 }}
                                    placeholder="IP查询"
                                    enterButton="Search"
                                    size="middle"
                                    allowClear
                                    loading={searchLoadinga}
                                    onSearch={onSearchIP}
                                />

                                <Button onClick={NewISPCharge} type="primary" style={{ float: "right", marginRight: 20 }}>New</Button>
                            </div>
                        )
                    }}
                />
            </Form>
        </Spin>
    );
};

export default EquipmentUsed