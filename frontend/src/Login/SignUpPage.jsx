import React, { Component } from 'react'
import AuthenticationService from '../service/AuthenticationService.js';
import AppNav from "../AppNav";
import { Form, Col, Button } from "react-bootstrap";
import { Redirect } from 'react-router-dom'
class SignUpComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            repeatedPassword: '',
            firstName: '',
            lastName: '',
            hasLoginFailed: false,
            showSuccessMessage: false,
            errorMsg: ''
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

       //executeSignUp

       AuthenticationService
            .executeSignUp(this.state.password, this.state.firstName, this.state.lastName, this.state.email)
            .then((response) => {
                 AuthenticationService.registerSuccessfulLogin(this.state.email, this.state.password)
                 AuthenticationService.setUpRoles(this.state.email)
                 this.props.history.push('/')
              })
              .catch((error) => {
                console.log(error.response.data.message);
                this.setState({
                errorMsg: error.response.data.message,
                showSuccessMessage: true })
              });



    }

    render() {
        return (
             <div>
                    <AppNav />
                    <div className="container mt-4">
                      <div>
                                      <h3>Sign In</h3>
                                      {/*<ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}/>*/}
                                                          {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                                                          {this.state.showSuccessMessage && <div className="alert alert-warning">{this.state.errorMsg}</div>}
                                      {/*<ShowLoginSuccessMessage showSuccessMessage={this.state.showSuccessMessage}/>*/}
                                      <div className="form-group">
                                            <input type="text" name="firstName" onChange={this.handleChange} className="form-control" placeholder="Enter your first name" />
                                        </div>

                                        <div className="form-group">
                                            <input type="text" name="lastName" onChange={this.handleChange} className="form-control" placeholder="Enter your last name" />
                                        </div>

                                      <div className="form-group">
                                          <input type="email" name="email" onChange={this.handleChange} className="form-control" placeholder="Enter email" />
                                      </div>

                                      <div className="form-group">
                                          <input type="password" name="password" onChange={this.handleChange} className="form-control" placeholder="Enter password" />
                                      </div>

                                      <div className="form-group">
                                        <input type="password" name="repeatedPassword" onChange={this.handleChange} className="form-control" placeholder="Please repeat your password" />
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
                                  </div>
                    </div>
                  </div>



        )
    }
}

export default SignUpComponent