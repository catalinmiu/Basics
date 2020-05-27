import React, { Component } from "react";
import AppNav from "../AppNav";
import { Row, Col, CardGroup, Form, Button, Card } from "react-bootstrap";
import "./Product.css";
import StarRatingComponent from "react-star-rating-component";
import axios from "axios";
import AuthenticationService from "../service/AuthenticationService.js";
import Products from "./Products";

class ProductPage extends Component {
  state = {
    Product: {},
    isLoading: true,
    Products: [],
    quantity: 0,
    rating: 0,
    description: "",
    userId: "",
    User: {},
  };

  onStarClick(nextValue, prevValue, name) {
    this.setState({ rating: nextValue });
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    const response = await fetch(`/products/${id}`);
    const body = await response.json();
    const responseProducts = await fetch("/products");
    const bodyProducts = await responseProducts.json();
    console.log(AuthenticationService.getLoggedInUserName());
    const responseUser = await fetch(
      `../users/search/${AuthenticationService.getLoggedInUserName()}`
    );
    console.log(responseUser);
    const bodyUser = await responseUser.json();
    this.setState({
      Product: body,
      isLoading: false,
      Products: bodyProducts,
      User: bodyUser,
    });
  }

  decreaseQuantity = () => {
    if (this.state.quantity > 0) {
      this.setState({ quantity: this.state.quantity - 1 });
    }
  };

  increaseQuantity = () => {
    if (this.state.quantity < this.state.Product.stock) {
      this.setState({ quantity: this.state.quantity + 1 });
    }
  };

  addToCart = () => {};

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = (e) => {
    const data = {
      score: this.state.rating,
      message: this.state.description,
      productId: this.state.Product.id,
      userId: this.state.User.id,
    };
    console.log(data);
    e.preventDefault();
    // console.log(this.state);
    var config = {
      headers: {
        "Access-Control-Allow-Origin": true,
        "Access-Control-Allow-Methods": "OPTIONS,GET,PUT,POST,DELETE",
        "Access-Control-Allow-Headers": "X-Requested-With, Content-Type",
        Authorization: AuthenticationService.getToken(),
      },
    };

    axios
      .post("http://localhost:8081/reviews", data, config)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const {
      Product,
      isLoading,
      Products,
      quantity,
      rating,
      description,
    } = this.state;
    let recommendedItems = [];
    let i = 0;
    for (const [index, value] of Products.entries()) {
      // console.log("AA");
      // console.log(value.category.id);
      // console.log(Product.category.id);
      // console.log(value.id);
      // console.log(Product.id);
      // console.log(Product.reviews);
      if (
        i < 3 &&
        value.category.id === Product.category.id &&
        value.id !== Product.id
      ) {
        // console.log(Products);
        recommendedItems.push(value);
        i += 1;
      }
      if (i == 3) {
        break;
      }
    }
    if (isLoading) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <AppNav />
        <div className="container mt-4" key={Product.id}>
          <Row>
            <Col className="col-xs-6">
              <img src="/images/cat.jpg" alt="" />
            </Col>
            <Col className="col-xs-6">
              <div>
                <h1 style={{ display: "block" }}>{Product.title}</h1>
                <h6>Reviews ({Product.reviews.length})</h6>
                <StarRatingComponent
                  name="rate1"
                  starCount={5}
                  value={Product.score}
                  editing={false}
                />
                <p className="mt-4 mb-4">{Product.description}</p>
                <h2 style={{ display: "block" }}>${Product.price}</h2>
                <h6>Options</h6>
                <select className="dropdown mb-4">
                  <option value="size" disabled selected>
                    Size
                  </option>
                  <option value="a">XS</option>
                  <option value="a">S</option>
                  <option value="a">M</option>
                  <option value="a">L</option>
                </select>
                <Button
                  variant="dark"
                  className="addToCartBtn"
                  onClick={this.addToCart}
                >
                  Add to Cart
                </Button>
                <Button
                  className="ml-4"
                  variant="dark"
                  onClick={this.decreaseQuantity}
                >
                  -
                </Button>
                <p style={{ display: "inline" }} className="mx-3">
                  {quantity}
                </p>
                <Button variant="dark" onClick={this.increaseQuantity}>
                  +
                </Button>
              </div>
            </Col>
          </Row>
          <div className="mt-4">
            <Row>
              <Col className="col-xs-12">
                <h2 className="frequentlyBoughtTogether mt-2 mb-4">
                  Frequently bought together
                </h2>
              </Col>
            </Row>
            <Row
              className="mt-4"
              style={{ display: "flex", justifyContent: "space-evenly" }}
            >
              {recommendedItems.map((recommendedItem) => (
                <a href={"/products/" + Product.id}>
                  <img
                    src="/images/cat.jpg"
                    alt=""
                    className="ml-3"
                    style={{
                      width: "150px",
                      height: "150px",
                    }}
                  />{" "}
                </a>
              ))}
            </Row>
            <Row className="mt-4">
              <Col className="mt-4">
                <h1
                  style={{ textAlign: "center", borderTop: "1px solid gray" }}
                  className="mt-2"
                >
                  Reviews
                </h1>
                <Form>
                  <Form.Row>
                    <p className="mr-2 ml-1">Rate : </p>
                    <StarRatingComponent
                      name="rate1"
                      starCount={5}
                      value={rating}
                      onStarClick={this.onStarClick.bind(this)}
                    />
                  </Form.Row>
                  <Form.Group controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows="7"
                      placeholder="Description"
                      name="description"
                      value={description}
                      onChange={this.changeHandler}
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="button"
                    className="mb-4"
                    onClick={this.submitHandler}
                  >
                    Submit
                  </Button>
                </Form>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductPage;
