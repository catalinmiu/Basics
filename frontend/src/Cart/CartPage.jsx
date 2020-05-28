import React, { Component } from 'react'
import AuthenticationService from '../service/AuthenticationService.js';
import AppNav from "../AppNav";
import { Form, Col, Button } from "react-bootstrap";
import { Redirect } from 'react-router-dom'
class CartPage extends Component {

        state = {
            isLoading: true,
            Products: [],
            userId: null
        };

    constructor(props) {
        super(props)


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

        const response = await fetch("/categories/1/products");
        const body = await response.json();
        this.setState({
              Products: body,
              isLoading: false,
              userId: bodyUser.id,
            });

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

        const {Products} = this.state;



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

                         {Products.map(product => (
                            <li class="product row">
                               <div class="col-product">
                                 <figure class="product-image">
                                   <img src="img/cap.png" alt="Cap" />
                                   <div class="product-description">
                                     <h1>{product.title}</h1>
                                     <p class="product-code">Product code X3W2OPY</p>
                                   </div>
                                 </figure>
                               </div>
                               <div class="col-quantity">
                                 <button class="count">-</button
                                 ><input type="text" class="product-quantity" value="4" /><button
                                   class="count"
                                 >
                                   +
                                 </button>
                               </div>
                               <div class="col-price">
                                 <span class="product-price">{product.price}</span
                                 ><span class="product-currency currency">€</span>
                               </div>
                               <div class="col-total">
                                 <span class="product-price">40</span
                                 ><span class="product-currency currency">€</span>
                               </div>
                             </li>
                         ))}

                       </ul>
                     </section>
                     <aside class="summary">
                       <h1 class="main">Order Summary</h1>
                       <ul class="summary-items wrapper border">
                         <li>
                           <span class="summary-items-number">11 Items</span
                           ><span class="summary-items-price"
                             >120<span class="currency">€</span></span
                           >
                         </li>
                       </ul>
                       <div class="summary-discounts wrapper-half border">
                         <h2>Discounts</h2>
                         <ul>
                           <li><span>2x1 Mug offer</span><span>-10€</span></li>
                           <li><span>x3 Shirt offer</span><span>-3€</span></li>
                           <li><span>Promo code</span><span>0€</span></li>
                         </ul>
                       </div>
                       <div class="summary-total wrapper">
                         <ul>
                           <li>
                             <span class="summary-total-cost">Total cost</span
                             ><span class="summary-total-price">107€</span>
                           </li>
                         </ul>
                         <button type="submit">Checkout</button>
                       </div>
                     </aside>
                   </main>
                 </div>
               </body>
             </html>




        )
    }
}

export default CartPage