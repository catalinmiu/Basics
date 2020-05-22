import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthenticationService from '../service/AuthenticationService';

class AuthenticatedRoute extends Component {
    render() {
        if (AuthenticationService.isAdmin()) {
            return <Route {...this.props} />
        } else {
            return <Redirect to="/" />
        }

    }
}

export default AuthenticatedRoute