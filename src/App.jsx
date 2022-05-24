import React, { Component } from 'react'
import { Route, Switch } from "react-router-dom";
// import { Redirect } from 'react-router-dom';
// import { getUserInfo } from "@/store/actions";
import './App.css'
import Login from './pages/Login'

import Home from './pages/Home'
import UpdatePassword from './pages/Login/routes/UpdatePassword'

import PrivateRoute from "./pages/Login/routes/PrivateRoute";

class App extends Component {

    render() {
        return (
            <div>
                <Switch>
                    {/* <Login /> */}
                    {/* <Route path='/Home' component={Home}/> */}
                    <Route exact  path='/' component={Login} />
                    <Route path={'updatePassword'} component={UpdatePassword}/>

                    <PrivateRoute  path={"/Home"} component={Home}/>

                </Switch>
            </div>
        )
    }
}

export default App;