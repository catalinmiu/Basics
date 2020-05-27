import React, { Component } from 'react'
import AuthenticationService from '../service/AuthenticationService.js';
import AppNav from "../AppNav";
import { Form, Col, Button } from "react-bootstrap";
class LoginComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]
                    : event.target.value
            }
        )
    }

    loginClicked() {
       console.log(this.state)
       AuthenticationService
            .executeBasicAuthenticationService(this.state.username, this.state.password)
            .then(() => {
                AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password)
                AuthenticationService.setUpRoles(this.state.username)
                //this.props.history.push(`/courses`)
            }).catch(() => {
                this.setState({ showSuccessMessage: false })
                this.setState({ hasLoginFailed: true })
            })
    }

    render() {
        return (
             <div>
                    <AppNav />
                    <div className="container mt-4">
                      <form>
                                      <h3>Sign In</h3>
                                      {/*<ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}/>*/}
                                                          {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                                                          {this.state.showSuccessMessage && <div>Login Sucessful</div>}
                                                          {/*<ShowLoginSuccessMessage showSuccessMessage={this.state.showSuccessMessage}/>*/}
                                      <div className="form-group">
                                          <label>Email address</label>
                                          <input type="email" name="username" onChange={this.handleChange} className="form-control" placeholder="Enter email" />
                                      </div>

                                      <div className="form-group">
                                          <label>Password</label>
                                          <input type="password" name="password" onChange={this.handleChange} className="form-control" placeholder="Enter password" />
                                      </div>

                                      <div className="form-group">
                                          <div className="custom-control custom-checkbox">
                                              <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                              <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                                          </div>
                                      </div>

                                      <button type="submit" className="btn btn-primary btn-block" onClick={this.loginClicked}>Submit</button>
                                      <p className="forgot-password text-right">
                                          Forgot <a href="#">password?</a>
                                      </p>
                                  </form>
                    </div>
                  </div>



        )
    }
}

export default LoginComponent