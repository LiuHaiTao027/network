import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from "react-redux";
// import { ConfigProvider } from "antd";
// import zhCN from "antd/es/locale/zh_CN";
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'
// import Login from './pages/Login'


ReactDOM.render(

    // <ConfigProvider locale={zhCN}>
    //     <Provider>
            <Router>
                <App/>
            </Router>
    //     </Provider>
    // </ConfigProvider>
    , document.getElementById('root')
);


