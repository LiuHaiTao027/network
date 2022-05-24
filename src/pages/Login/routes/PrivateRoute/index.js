import { Route, Redirect } from "react-router-dom";
// import { message } from 'antd';
// import {Component} from "react";
// 定义鉴权函数
let authenticate = () => {
    // 获取页面中存储的token
    // let token = sessionStorage.getItem('token');
    // // 根据是否存在token,返回不同的值
    // return token ? true : false
    //获取token
    let token = localStorage.getItem('token');
    return token ? true : false
}

// 定义路由组件
// ...rest将传给组件的所有参数全部解析出来
const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            // 进行重新渲染
            render={(props) => authenticate() ? <Component {...props} /> :
                <Redirect to={{
                    pathname: '/', // 指定重定向的路径
                    state: { from: props.location } // 将重定向的路径放入页面的地址栏
                }} />
            }
        ></Route>
    )
}
export default PrivateRoute;
