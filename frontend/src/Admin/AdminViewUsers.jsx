import React, { Component } from "react";
import { Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";

class AdminViewUsers extends Component {
  state = {
    Users: [],
    isLoading: true,
  };

  async componentDidMount() {
    const response = await fetch("/users");
    const body = await response.json();
    this.setState({ isLoading: false, Users: body });
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
