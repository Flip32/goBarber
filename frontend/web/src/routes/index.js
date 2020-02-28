import React from 'react'
import { Switch, Route } from 'react-router-dom'

import SingIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Profile from "../pages/Profile";
import Dashboard from "../pages/Dashboard";

export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={SingIn} />
            <Route path="/register" exact component={SignUp} />
            <Route path="/dashboard" exact component={Profile} />
            <Route path="/profile" exact component={Dashboard} />
        </Switch>
    )
}
