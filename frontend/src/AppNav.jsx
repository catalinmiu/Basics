import React, { Component } from "react";
import { Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";
import "./AppNav.css";
import AuthenticationService from "./service/AuthenticationService.js";

class AppNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      Products: [],
    };
  }

  async getProducts(title) {
    if (title === "") {
      title = "%20";
    }
    const response = await fetch(`/products/search/${title}`);
    const body = await response.json();
    this.setState({ Products: body });
    console.log(this.state.Products);
  }

  handleChange(e) {
    const { Products } = this.state;
    this.setState({ searchValue: e.target.value });
    this.getProducts(e.target.value);

    // console.log(document.getElementsByClassName("search-dropdown-element"));
    console.log(document.getElementsByClassName("search-input"));
    console.log(document.activeElement);
    if (
      document.getElementsByClassName("search-input") === document.activeElement
    ) {
      console.log(" e selectat");
    }
  }

  handleClick(e) {
    document
      .getElementById("search-dropdown-id")
      .classList.add("search-dropdown-visible");
    this.getProducts(e.target.value);
    document
      .getElementById("search-dropdown-id")
      .classList.remove("search-dropdown-invisible");
  }

  handleBlur(e) {
    document
      .getElementById("search-dropdown-id")
      .classList.add("search-dropdown-invisible");
    document
      .getElementById("search-dropdown-id")
      .classList.remove("search-dropdown-visible");
  }

  render() {
    const { Products } = this.state;
    return (
      <div>
        <Navbar bg="dark" expand="lg" variant="dark">
          <Navbar.Brand href="">Basics</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/products">Products</Nav.Link>
              <Nav.Link href="#">
                {AuthenticationService.getLoggedInUserName()}
              </Nav.Link>
            </Nav>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2 search-input"
                value={this.state.searchValue}
                onChange={(e) => this.handleChange(e)}
                onClick={(e) => this.handleClick(e)}
                // onBlur={(e) => this.handleBlur(e)}
              />
              <div className="search-dropdown" id="search-dropdown-id">
                {Products.map((product) => (
                  <div key={product.id} className="search-dropdown-element">
                    <p>
                      <a href={"/products/" + product.id}>{product.title}</a>
                    </p>
                  </div>
                ))}
              </div>
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default AppNav;
