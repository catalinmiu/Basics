import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthenticationService from '../service/AuthenticationService';

class NonAuthenticatedRoute extends Component {
    render() {
        if (AuthenticationService.isUserLoggedIn()) {
            return <Redirect to="/" />
        } else {
            return <Route {...this.props} />
        }

    }
}

export default NonAuthenticatedRoute