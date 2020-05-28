import React, {Component} from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import AdminHome from "./Admin/AdminHome"
import AdminViewUsers from "./Admin/AdminViewUsers"
import UserProfile from "./User/UserProfile"
import Products from "./Products/Products"
import ProductPage from "./Products/Product"
import LoginComponent from "./Login/LoginPage"
import SignUpComponent from "./Login/SignUpPage"

import LogoutComponent from "./Login/LogoutPage"
import AuthenticatedRoute from './component/AuthenticatedRoute';
import NonAuthenticatedRoute from './component/NonAuthenticatedRoute';
import AdminRoute from './component/AdminRoute';
import postProductForm from "./Products/postProductForm"
import history from './history'

function App() {
  return (
    <Router history={history}>
    <Switch>
      <Route path="/" exact={true} component={Home} />
      /*{/* <Route path="/products" exact={true} component={Product} />
      <Route path="/categories" exact={true} component={Category} />*/}*/
      <AdminRoute path="/admin" exact={true} component={AdminHome} />
      <AuthenticatedRoute path="/admin/view_users" exact={true} component={AdminViewUsers} />
      <AuthenticatedRoute path="/admin/view_users/user/:id" exact={true} component={UserProfile} />
      <Route path="/products" exact={true} component={Products} />
<<<<<<< HEAD
      <Route path="/login" exact component={LoginComponent} />
      <Route path="/logout" exact component={LogoutComponent} />
      <Route path="/products/:id" exact={true} component={ProductPage} />
      <Route path="/admin/addProduct" exact={true} component={postProductForm} />
      <Route path="/categories/:id/products" exact={true} component={Products} />
=======
      <NonAuthenticatedRoute path="/login" exact component={LoginComponent} />
      <NonAuthenticatedRoute path="/signup" exact component={SignUpComponent} />
      <AuthenticatedRoute path="/logout" exact component={LogoutComponent} />

      <Route path="/products/:id" exact={true} component={ProductPage} />
      <AdminRoute path="/admin/addProduct" exact={true} component={postProductForm} />
>>>>>>> bb2e5607ac0defb64cf2a15490273bfd4e6de6a7

    </Switch>
  </Router>
  );
}

export default App;
