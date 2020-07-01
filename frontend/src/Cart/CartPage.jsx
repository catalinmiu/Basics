import React, { Component } from "react";
import AuthenticationService from "../service/AuthenticationService.js";
import AppNav from "../AppNav";
import { Form, Col, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import axios from "axios";
// import { createBrowserHistory } from "history";
// export const history = createBrowserHistory({ forceRefresh: true });

class CartPage extends Component {
  state = {
    isLoading: true,
    Products: [],
    userId: null,
  };

  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    //const { id } = this.props.match.params;
    console.log(AuthenticationService.getLoggedInUserName());
    //console.log(typeof Response);
    const responseUser = await fetch(
      `../users/search/${AuthenticationService.getLoggedInUserName()}`
    );
    console.log(responseUser);
    const bodyUser = await responseUser.json();
    this.setState({ userId: bodyUser.id });
    const response = await fetch(`/carts/myCart/${this.state.userId}`);
    console.log(response);
    const body = await response.json();
    console.log(body);
    this.setState({
      Products: body,
      isLoading: false,
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  loginClicked() {
    console.log(this.state);

    //executeSignUp

    AuthenticationService.executeSignUp(
      this.state.password,
      this.state.firstName,
      this.state.lastName,
      this.state.email
    )
      .then((response) => {
        AuthenticationService.registerSuccessfulLogin(
          this.state.email,
          this.state.password
        );
        AuthenticationService.setUpRoles(this.state.email);
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error.response.data.message);
        this.setState({
          errorMsg: error.response.data.message,
          showSuccessMessage: true,
        });
      });
  }

  updateQuntity = (id) => {
    var { Products } = this.state;
    const data = {
      productId: Products[id].product.id,
      quantity: Products[id].quantity,
    };
    console.log(data);
    // e.preventDefault();
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
      .post("http://localhost:8081/carts", data, config)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  decreaseQuantity(id) {
    console.log(id);
    var { Products } = this.state;
    console.log(Products);
    if (Products[parseInt(id)].quantity > 0) {
      Products[parseInt(id)].quantity = Products[parseInt(id)].quantity - 1;
      this.setState({ Products: Products });
      this.updateQuntity(id);
    } else {
      console.log(Products[id]);
      Products.splice(id, 1);
      console.log(Products);
      this.forceUpdate();
    }
    // if (this.state.quantity > 0) {
    //   this.setState({ quantity: this.state.quantity - 1 });
    // }
  }

  increaseQuantity(id) {
    var { Products } = this.state;
    console.log(Products);
    if (
      Products[parseInt(id)].quantity < Products[parseInt(id)].product.stock
    ) {
      Products[parseInt(id)].quantity = Products[parseInt(id)].quantity + 1;
      this.setState({ Products: Products });
      this.updateQuntity(id);
    }
  }

  handleCheckout = () => {
    var config = {
      headers: {
        "Access-Control-Allow-Origin": true,
        "Access-Control-Allow-Methods": "OPTIONS,GET,PUT,POST,DELETE",
        "Access-Control-Allow-Headers": "X-Requested-With, Content-Type",
        Authorization: AuthenticationService.getToken(),
      },
    };
    var data = {};

    axios
      .post("http://localhost:8081/carts/checkout", data, config)
      .then((response) => {
        console.log(response);
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { Products } = this.state;
    let total = 0;
    for (const [index, value] of Products.entries()) {
      total += value.product.price * value.quantity;
    }
    return (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#7350FF" />
          <link rel="manifest" href="/manifest.json" />
          <link href="css/main.css" rel="stylesheet" />
          <title>Cabify Checkout Challenge</title>
        </head>
        <body>
          <AppNav />
          <div id="root">
            <main class="App">
              <section class="products">
                <h1 class="main">Shopping cart</h1>
                <ul class="products-list tableHead">
                  <li class="products-list-title row">
                    <div class="col-product">Product details</div>
                    <div class="col-quantity">Quantity</div>
                    <div class="col-price">Price</div>
                    <div class="col-total">Total</div>
                  </li>
                </ul>
                <ul class="products-list">
                  {Products.map((product, index) => (
                    <li class="product row" key={product.cartProductId}>
                      <div class="col-product">
                        <figure class="product-image">
                          <img src={product.product.image} alt="Cap" />
                          <div class="product-description">
                            <h1>{product.product.title}</h1>

                          </div>
                        </figure>
                      </div>
                      <div class="col-quantity">
                        <button
                          class="count"
                          onClick={() => this.decreaseQuantity(index)}
                        >
                          -
                        </button>
                        <input
                          type="text"
                          class="product-quantity"
                          value={product.quantity}
                        />
                        <button
                          class="count"
                          onClick={() => this.increaseQuantity(index)}
                        >
                          +
                        </button>
                      </div>
                      <div class="col-price">
                        <span class="product-price">
                          {product.product.price}
                        </span>
                        <span class="product-currency currency">€</span>
                      </div>
                      <div class="col-total">
                        <span class="product-currency currency">$</span>
                        <span class="product-price">
                          {product.product.price * product.quantity}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
              <aside class="summary">
                <h1 class="main">Order Summary</h1>
                <ul class="summary-items wrapper border">
                  <li>
                    <span class="summary-items-number">
                      {Products.length} Items
                    </span>
                    <span class="summary-items-price">
                      $<span class="currency">{total}</span>
                    </span>
                  </li>
                </ul>
                {/* <div class="summary-discounts wrapper-half border">
                  <h2>Discounts</h2>
                  <ul>
                    <li>
                      <span>2x1 Mug offer</span>
                      <span>-10€</span>
                    </li>
                    <li>
                      <span>x3 Shirt offer</span>
                      <span>-3€</span>
                    </li>
                    <li>
                      <span>Promo code</span>
                      <span>0€</span>
                    </li>
                  </ul>
                </div> */}
                <div class="summary-total wrapper">
                  <ul>
                    <li>
                      <span class="summary-total-cost">Total cost</span>
                      <span class="summary-total-price">${total}</span>
                    </li>
                  </ul>
                  <button type="submit" onClick={this.handleCheckout}>
                    Checkout
                  </button>
                </div>
              </aside>
            </main>
          </div>
        </body>
      </html>
    );
  }
}

export default CartPage;
