import React from 'react'
import { Switch } from 'react-router-dom'

import Route from './Route'

import SingIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Profile from "../pages/Profile";
import Dashboard from "../pages/Dashboard";

export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={SingIn} />
            <Route path="/register" exact component={SignUp} />
            <Route path="/dashboard" exact component={Dashboard} isPrivate />
            <Route path="/profile" exact component={Profile} isPrivate />

            <Route path="/" component={() => <h1>404 - Page not Found.</h1>} />
        </Switch>
    )
}
