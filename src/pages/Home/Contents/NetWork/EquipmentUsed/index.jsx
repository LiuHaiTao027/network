import React, { useState, useEffect } from 'react';
import { Table, Input, Popconfirm, Form, Typography, message, Button, Spin, Select } from 'antd';
import axios from 'axios';
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
    const inputNode = title === '是否需要转出' ?
        <Select children={[<Option key='is' value='是'>是</Option>,<Option key='not' value='否'>否</Option>]} /> :
        <Input /> 
        && title === '是否已转出' ? 
        <Select children={[<Option key='is' value='是'>是</Option>,<Option key='not' value='否'>否</Option>]} /> :
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

const EquipmentUsed = (props) => {
    const [form] = Form.useForm();
    const [data, setData] = useState(originData);
    const [editingKey, setEditingKey] = useState('');
    const [isLoading, setLoading] = useState(false)
    const isEditing = (record) => record.key === editingKey;
    const getInfo = async () => {
        const info = []
        try {
            setLoading(true)
            const result = await axios.post('/api/getEquipmentUsed')
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
                item.editors = localStorage.getItem('username')
                newData.splice(index, 1, { ...item, ...row });
                const result = await axios.post('/api/update_EquipmentUsed', newData)
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
            // key: 'year',
            editable: true,
            width: '6%'
        },
        {
            title: 'IP地址',
            dataIndex: 'IP',
            // key: 'Operator',
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
            title: '是否需要转出',
            dataIndex: 'isRoll',
            key: 'isRoll',
            editable: true,
        },
        {
            title: '是否已转出',
            dataIndex: 'isRoll_out',
            key: 'isRoll_out',
            editable: true,
        },
        {
            title: '编辑者',
            dataIndex: 'editors',
            key: 'editors',
            // editable: true,
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
                        data.forEach((element) => {
                            if (element.isRoll_out === '否') {
                                count1 += 1
                            } if (element.isRoll_out === '是') {
                                count2 += 1
                            }
                        })
                        return (
                            <div>
                                <span style={{ fontWeight: 'bold', fontSize: 16 }}>
                                    设备已转出: <span style={{ color: 'green', textDecoration: 'underline' }}>{count2}</span>
                                    &nbsp;&nbsp;
                                    设备未转出: <span onClick={handleIsRoll_out(record)} style={{ color: 'red', textDecoration: 'underline', cursor: 'pointer' }}>{count1}</span>
                                </span>
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