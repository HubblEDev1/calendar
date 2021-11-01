import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";

import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        path = "/login"
                        component = {LoginScreen}
                        isAuthenticated = {true}
                    />
                    <PrivateRoute
                        exact
                        path = "/"
                        component = {CalendarScreen}
                        isAuthenticated={false}
                    />
                </Switch>
            </div>
        </Router>
    )
}
