import React, { Component } from 'react'
// import { Redirect } from 'react-router-dom';
import { Route, Switch } from "react-router-dom";
// import { getUserInfo } from "@/store/actions";
import './App.css'
import Login from './pages/Login'

import Home from './pages/Home'


class App extends Component {

    render() {
        return (
            <div>
                <Switch>
                    {/* <Login /> */}
                    <Route path='/Home' component={Home}/>

                    <Route path='/' component={Login} />
                </Switch>
            </div>
        )
    }
}

export default App;