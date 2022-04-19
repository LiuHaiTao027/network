import React, {Component} from 'react';
import { message, Form, Input, Button, DatePicker, Select} from 'antd';
import axios from "axios";
import moment from "moment";
import TextArea from "antd/es/input/TextArea";
const { Option } = Select;

class NewAbnormal extends Component {
    state = {
        classType:this.props.location.state.classType,
        dutyDate:'',
        HandoverDate:'',
        people: this.props.location.state.username,
        Contact: undefined,
        duration: undefined,
        event: undefined,
        influence: undefined,
        reason: undefined,
        solution: undefined,
        stop: undefined,
        odd: undefined,
        email:'',
        del_id: undefined,
    }

     componentDidMount(){
        this.setState({
            HandoverDate:moment().format('YYYY-MM-DD'),
            dutyDate:this.now(this.props.location.state.classType)(),
            email:this.email.input.value
        })
        // this.state.HandoverDate = moment().format('YYYY-MM-DD')
        // this.state.dutyDate = this.now(this.props.location.state.classType)()
        // this.state.email = this.email.input.value
    }
    onSubmit = async()=>{
        message.success('发送成功')
        const process_event = {...this.state}
        // console.log(process_event)
        try{
            await axios.post('/api/newEvent', process_event)
            // console.log(result.data)
        }catch(error){
            if(error) throw error
        }
        // console.log(this.state)
    }

    onChange = (NodeType)=>{
        return (date, dateString)=>{
            this.setState({[NodeType]:dateString})
        }
    }
    onchange =(value)=>{
        console.log(value)
        this.setState({stop:value})
        // console.log(this.state.stop)
    }

    FormDate = (NodeType)=>{
        return event => {
            // let newProcess_event = this.state.process_event
            this.setState({[NodeType]:event.target.value})
        };
    }

    now = (a)=>{
        return ()=>{
            if (this.props.location.state.classType === '夜班'){
                const year_Month = moment().format('YYYY-MM')
                let day = moment().format('DD') - 1
                if (day < 10){
                    day = '0' + day
                }
                return year_Month + '-' + day
            }else {
                return moment().format('YYYY-MM-DD')
            }
        }
    }

    // const beforeDay = now(this.props.location.state.classType)()
    render() {

        return (
            <div style={{marginTop:30}}>
                <Form layout={'inline'}>
                    <Form.Item label="班别" style={{width:120}}>
                        {this.props.location.state.classType}
                    </Form.Item>
                    <Form.Item label="处理人" style={{width:120}}>
                        {this.props.location.state.username}
                    </Form.Item>
                    <Form.Item label="班别日期" style={{width:200}}>
                        {/*<DatePicker onChange={this.onChange('dutyDate')} />*/}
                        <DatePicker defaultValue={moment(this.now(this.props.location.state.classType)())} onChange={this.onChange('dutyDate')} />
                    </Form.Item>
                    <Form.Item label="交接日期" style={{width:200}}>
                        {/*<DatePicker onChange={this.onChange('HandoverDate')} />*/}
                        <DatePicker defaultValue={moment()} onChange={this.onChange('HandoverDate')} />
                    </Form.Item>

                </Form>
                <Form layout={'inline'} style={{marginTop:30}}>
                    <Form.Item label="联络人" style={{width:160}}>
                        <Input placeholder="无" onChange={this.FormDate('Contact')}/>
                    </Form.Item>
                    <Form.Item label="异常事件" style={{width:260}}>
                        <Input placeholder="无" onChange={this.FormDate('event')}/>
                    </Form.Item>
                    <Form.Item label="异常影响" style={{width:260}}>
                        <Input placeholder="无" onChange={this.FormDate('influence')}/>
                    </Form.Item>
                    <Form.Item label="异常原因" style={{width:260}}>
                        <Input placeholder="无" onChange={this.FormDate('reason')}/>
                    </Form.Item>
                </Form>
                <Form layout={'inline'} style={{marginTop:30}}>
                    <Form.Item label="有无停线" >
                        <Select
                            ref={c => this.isStop = c}
                            defaultValue='无'
                            style={{width:90, height:30}}
                            onChange={this.onchange}
                        >
                            <Option value="无">无</Option>
                            <Option value='有'>有</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="停线单号" style={{width:260}}>
                        <Input placeholder="停线单号" onChange={this.FormDate('odd')}/>
                    </Form.Item>
                    <Form.Item label="异常时间" style={{width:260}}>
                        <Input placeholder="异常时间" onChange={this.FormDate('duration')}/>
                    </Form.Item>

                </Form>
                <Form layout={'inline'} style={{marginTop:30}}>
                    <Form.Item label="email - To" style={{width:340}}>
                        <Input ref={c=>this.email=c} onChange={this.FormDate('email')} defaultValue="KDLD30@wistron.com" />
                    </Form.Item>
                    <Form.Item label="解决方案" style={{width:340}}>
                        <TextArea autoSize={{minRows: 2, maxRows: 5}} showCount maxLength={100} onChange={this.FormDate('solution')} />
                    </Form.Item>
                    <Button type="primary" onClick={this.onSubmit}>提交</Button>
                </Form>
            </div>
        );
    }
}

export default NewAbnormal;