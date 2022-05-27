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
    const inputNode = title === '施工状态' ?
        <Select
            children={[
                <Option key='待施工' value='待施工'>待施工</Option>,
                <Option key='施工中' value='施工中'>施工中</Option>,
                <Option key='施工完成' value='施工完成'>施工完成</Option>
            ]} /> : <Input />
                &&
                title === '验收状态' ?
            <Select children={[
                <Option key='待验收' value='待验收'>待验收</Option>,
                <Option key='验收完成' value='验收完成'>验收完成</Option>,
            ]} /> : <Input />
        ;
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

function ProcessTrack(props) {
    const [form] = Form.useForm();
    const [data, setData] = useState(originData);
    const [filiter, setFiliter] = useState(data);
    const [yearFiliter, setyearFiliter] = useState(data)
    const [editingKey, setEditingKey] = useState('');
    const [isLoading, setLoading] = useState(false)
    const isEditing = (record) => record.key === editingKey;
    const getInfo = async () => {
        const info = []
        try {
            setLoading(true)
            const result = await axios.post('http://10.62.22.249:8000/ProcessTrack')
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
                newFIliter.push({ text: i.recorder, value: i.recorder })
            })
            setFiliter(_.uniqWith(newFIliter, _.isEqual))
        }
        getFiliter()
    }, [data])

    useEffect(() => {
        // 获取年份筛选数据
        const getyearFiliter = () => {
            const newFIliter = []
            data.forEach((i) => {
                newFIliter.push({ text: i.year, value: i.year })
            })
            setyearFiliter(_.uniqWith(newFIliter, _.isEqual))
        }
        getyearFiliter()
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

    // const DownLoad = async (key) => {
    //     const newData = [...data];
    //     const index = newData.findIndex((item) => key === item.key);
    //     const dutyName = { dutyName: newData[index].dutyDate }
    //     try {
    //         const result = await axios.post('http://10.62.22.249:8000/Findtext', dutyName)
    //         if (result.status >= 200 && result.status < 300) {
    //             message.success('下载成功')
    //         } else {
    //             message.error('no such file or directory')
    //         }
    //     } catch (error) {
    //         if (error) {
    //             message.error('no such file or directory')
    //         }
    //     }

    // }

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
            title: 'PIC',
            width: 75,
            dataIndex: 'recorder',
            fixed: 'left',
            filters: [...filiter],
            onFilter(value, record) {
                if (value === record.recorder) return record.recorder
            },
            // key: 'HandoverDate',
        },
        {
            title:'年份',
            dataIndex:'year',
            width: 80,
            filters: [...yearFiliter],
            onFilter(value, record) {
                if (value === record.year) return record.year
            },
        },
        {
            title: '厂别',
            width: 70,
            dataIndex: 'factory',
            // key: 'HandoverDate',
        },
        {
            title: 'ITSR单号',
            dataIndex: 'ITSR',
            editable: true,
            // key: 'people',
            width: 100,
        },
        {
            title: 'PR开立日期',
            dataIndex: 'PR_Date',
            editable: true,
            // key: 'Contact',
            width: 150,
        },
        {
            title: 'SR Number',
            dataIndex: 'SR',
            editable: true,
            // key: 'duration',
            width: 150,
        },
        {
            title: 'PR Number',
            dataIndex: 'PR',
            editable: true,
            // key: 'event',
            width: 150,
        },
        {
            title: 'PO Number',
            dataIndex: 'PO',
            editable: true,
            // key: 'influence',
            width: 150,
            ellipsis: true,
        },
        {
            title: '金额',
            dataIndex: 'amount',
            editable: true,
            // key: 'reason',
            width: 150,
        },
        {
            title: '挂账部门',
            dataIndex: 'charge_sector',
            editable: true,
            // key: 'solution',
            width: 150,
        },
        {
            title: '厂商',
            dataIndex: 'vender',
            editable: true,
            width: 100,
            // key: 'stop'
        },
        {
            title: '类别',
            dataIndex: 'category',
            width: 100,
            editable: true,
            // key: 'odd'
        },
        {
            title: '需求描述',
            dataIndex: 'Requirement',
            editable: true,
            ellipsis: true,
        },
        {
            title: 'RT NO.',
            dataIndex: 'RT',
            width: 100,
            editable: true,
        },
        {
            title: '发票号码',
            dataIndex: 'invoice',
            width: 150,
            editable: true,
        },
        {
            title: '发票送达日期',
            width: 150,
            dataIndex: 'invoice_Delivery_date',
            editable: true,
        },
        {
            title: '发票送采购日期',
            dataIndex: 'invoice_procurement',
            width: 150,
            editable: true,
        },
        {
            title: '备注',
            dataIndex: 'note',
            editable: true,
        },
        {
            title: '施工状态',
            dataIndex: 'construction_state',
            width: 120,
            editable: true,
            fixed: 'right',
            filters: [
                {
                    text: '待施工',
                    value: '待施工'
                },
                {
                    text: '施工中',
                    value: '施工中'
                },
                {
                    text: '施工完成',
                    value: '施工完成'
                },
            ],
            onFilter(value, record) {
                if (value === '待施工') {
                    return record.construction_state === '待施工'
                } else if (value === '施工中') {
                    return record.construction_state === '施工中'
                } else if (value === '施工完成') {
                    return record.construction_state === '施工完成'
                }
            },
            render: function (text, record) {
                if (record.construction_state === '施工完成') {
                    return <div style={{ color: "Green", fontWeight: 'bold' }}>施工完成</div>
                } else if (record.construction_state === '待施工') {
                    return <div style={{ color: "red", fontWeight: 'bold' }}>待施工</div>
                } else if (record.construction_state === '施工中') {
                    return <div style={{ color: "orange", fontWeight: 'bold' }}>施工中</div>
                }
            },
        },
        {
            title: '验收状态',
            dataIndex: 'acceptance_phase',
            width: 120,
            editable: true,
            fixed: 'right',
            filters: [
                {
                    text: '待驗收',
                    value: '待驗收'
                },
                {
                    text: '驗收完成',
                    value: '驗收完成'
                },
            ],
            onFilter(value, record) {
                if (value === '待驗收') {
                    return record.acceptance_phase === '待驗收'
                } else if (value === '驗收完成') {
                    return record.acceptance_phase === '驗收完成'
                }
            },
            render: function (text, record) {
                if (record.acceptance_phase === '驗收完成') {
                    return <div style={{ color: "Green", fontWeight: 'bold' }}>驗收完成</div>
                } else if (record.acceptance_phase === '待驗收') {
                    return <div style={{ color: "red", fontWeight: 'bold' }}>待驗收</div>
                }
            },
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            width: 100,
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
                    scroll={{ x: 3000, y: 500 }}
                    expandable={{
                        expandedRowRender: record =>
                            <div style={{ margin: 0 }}>
                                <p style={{ borderBottom: 'solid 1px black' }}>需求描述：{record.Requirement}</p>
                                <p style={{ borderBottom: 'solid 1px black' }}>PO: {record.PO}</p>
                                <p style={{ borderBottom: 'solid 1px black' }}>备注: {record.note}</p>
                            </div>,
                        rowExpandable: record => record.event !== 'Not Expandable',
                    }}
                    title={(record) => {
                        let count1 = 0;
                        let count2 = 0;
                        data.forEach((element) => {
                            if (element.construction_state === '施工完成') {
                                count2 += 1
                            } if (element.acceptance_phase === '驗收完成') {
                                count1 += 1
                            }
                        })
                        return (
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontWeight: 'bold', fontSize: 16 }}>
                                    <span>工程进度追踪：</span>
                                    &nbsp;&nbsp;
                                    工程总数: <span style={{ color: 'green', textDecoration: 'underline', cursor: 'pointer' }}>{data.length}</span>
                                    &nbsp;&nbsp;
                                    施工完成: <span style={{ color: 'green', textDecoration: 'underline', cursor: 'pointer' }}>{count2}</span>
                                    &nbsp;&nbsp;
                                    验收完成: <span style={{ color: 'green', textDecoration: 'underline', cursor: 'pointer' }}>{count1}</span>
                                </span>

                                <Button type="primary" style={{ float: "right", marginRight: 20 }}>New</Button>
                            </div>
                        )
                    }}
                />
            </Form>
        </Spin>
    );
}

export default ProcessTrack