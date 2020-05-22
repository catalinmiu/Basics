import React, { Component } from "react";
import { Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";
import axios from 'axios'
import AuthenticationService from '../service/AuthenticationService.js';

class AdminViewUsers extends Component {
  state = {
    Users: [],
    isLoading: true,
  };

  async componentDidMount() {
    var config = {
        headers: {'Access-Control-Allow-Origin': true,
                   'Access-Control-Allow-Methods': "OPTIONS,GET,PUT,POST,DELETE",
                   'Access-Control-Allow-Headers': "X-Requested-With, Content-Type",
                   'Authorization': AuthenticationService.getToken()}
    };


    axios.get('http://localhost:8081/users', config).then(response => {
                                           this.setState({isLoading: false, Users: response.data })
                              }
                 );
  }

  render() {
    const { Users, isLoading } = this.state;
    if (isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Navbar bg="dark" expand="lg" variant="dark" className="mb-4">
          <Navbar.Brand href="">BASICS ADMINISTRATION</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Form className="ml-auto" inline>
              {/* <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              /> */}
              <Button href="/" variant="outline-warning" className="mr-sm-2">
                View Site
              </Button>
              <Button variant="outline-warning">Log out</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
        <br />
        <div>
          {Users.map((user) => (
            <div key={user.id}>
              <h3>
                <a href={"/admin/view_users/user/" + user.id}>
                  {user.firstName} {user.lastName}
                </a>{" "}
                - {user.roles[0].title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default AdminViewUsers;
