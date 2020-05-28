import React, { Component } from "react";
import { Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";
import "./AdminHome.css";
import history from "../history";
import postProductForm from "../Products/postProductForm";
// import Product from "../Product";

class AdminHome extends Component {
  state = {
    Products: [],
    isLoading: true,
    orders: 0,
    totalSales: 0,
    Categories: 0,
    outOfStock: 0,
  };

  async componentDidMount() {
    const response = await fetch("/products");
    const body = await response.json();
    const ordersResponse = await fetch("/carts/orders");
    const ordersBody = await ordersResponse.json();
    const totalSalesResponse = await fetch("/carts/totalSales");
    const totalSalesBody = await totalSalesResponse.json();
    const CategoriesResponse = await fetch("/categories");
    const CategoriesBody = await CategoriesResponse.json();
    const outOfStockResponse = await fetch("/categories");
    const outOfStockBody = await outOfStockResponse.json();
    this.setState({
      Products: body,
      isLoading: false,
      orders: ordersBody.length,
      totalSales: totalSalesBody,
      Categories: CategoriesBody.length,
      outOfStock: outOfStockBody.length,
    });
    // this.setState(productCount: )
  }

  render() {
    const { Products, orders, totalSales, Categories, outOfStock } = this.state;
    return (
      <div>
        {/* NAVBAR */}

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

        {/* Container */}
        <div className="container">
          <h2 className="mb-4">DASHBOARD</h2>
          <div className="row">
            {/* USERS AND ADMINS  */}
            <div className="col-md-8 p-2">
              <div className="info">
                {/* AUTHENTICATIOMN AND AUTORIZATION */}
                <h5
                  style={{ backgroundColor: "gold", padding: "2px" }}
                  className="mb-0"
                >
                  Authentication and Authorization
                </h5>
                <div className="parentElement">
                  <div className="childElement">
                    <p className="mb-0">Admins</p>
                  </div>

                  <button style={{ float: "right" }} className="btn btn-info">
                    Change
                  </button>
                  <button
                    style={{ float: "right" }}
                    className="btn btn-success"
                  >
                    Add
                  </button>
                </div>
                <div className="parentElement">
                  <div className="childElement">
                    <p className="mb-0" style={{ display: "inline-block" }}>
                      <a href="/admin/view_users">Users</a>
                    </p>
                  </div>

                  <button style={{ float: "right" }} className="btn btn-info">
                    Change
                  </button>
                  <button
                    style={{ float: "right" }}
                    className="btn btn-success"
                  >
                    Add
                  </button>
                </div>
                {/* CATALOG */}
                <h5
                  className="mt-4 mb-0"
                  style={{ backgroundColor: "gold", padding: "2px" }}
                >
                  Catalog
                </h5>
                <div className="parentElement">
                  <div className="childElement">
                    <p className="mb-0">Products</p>
                  </div>

                  <button style={{ float: "right" }} className="btn btn-info">
                    Change
                  </button>
                  <a href="/admin/addProduct">
                    <button
                      style={{ float: "right" }}
                      className="btn btn-success"
                    >
                      Add
                    </button>
                  </a>
                </div>
                <div className="parentElement">
                  <div className="childElement">
                    <p className="mb-0">Categories</p>
                  </div>

                  <button style={{ float: "right" }} className="btn btn-info">
                    Change
                  </button>
                  <button
                    style={{ float: "right" }}
                    className="btn btn-success"
                  >
                    Add
                  </button>
                </div>
                {/* <div className="parentElement">
                  <div className="childElement">
                    <p className="mb-0">Orders</p>
                  </div>

                  <button style={{ float: "right" }} className="btn btn-info">
                    Change
                  </button>
                  <button
                    style={{ float: "right" }}
                    className="btn btn-success"
                  >
                    Add
                  </button>
                </div> */}
              </div>
            </div>
            {/* OVERVIEW OF THE STORE */}
            <div className="col-md-4 p-2">
              <h5
                className="overview"
                style={{ backgroundColor: "gold", padding: "2px" }}
              >
                Overview
              </h5>
              <div className="overviewElement">
                <p>Orders</p>
                <p>{orders}</p>
              </div>
              <div className="overviewElement">
                <p>Sales</p>
                <p>{totalSales}</p>
              </div>
              <div className="overviewElement">
                <p>Active Products</p>
                <p>{Products.length}</p>
              </div>
              <div className="overviewElement">
                <p>Out of stock</p>
                <p>{outOfStock}</p>
              </div>
              <div className="overviewElement">
                <p>Categories</p>
                <p>{Categories}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminHome;
