import React, { Component } from "react";
import { Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";

class AppNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      Products: [],
    };
  }

  async getProducts(title) {
    const response = await fetch(`/products/search/${title}`);
    const body = await response.json();
    console.log(body);
    this.setState({ Products: body });
  }

  handleChange(e) {
    this.setState({ searchValue: e.target.value });
    this.getProducts(this.state.searchValue);
    // console.log(this.state.searchValue);
  }

  handleClick() {}

  render() {
    return (
      <div>
        <Navbar bg="dark" expand="lg" variant="dark">
          <Navbar.Brand href="">Basics</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/products">Products</Nav.Link>
              <Nav.Link href="/categories">Categories</Nav.Link>
            </Nav>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                value={this.state.searchValue}
                onChange={(e) => this.handleChange(e)}
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default AppNav;
