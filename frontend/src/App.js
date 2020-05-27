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
import LogoutComponent from "./Login/LogoutPage"
import AuthenticatedRoute from './component/AuthenticatedRoute';
import NonAuthenticatedRoute from './component/NonAuthenticatedRoute';
import AdminRoute from './component/AdminRoute';
import postProductForm from "./Products/postProductForm"

function App() {
  return (
    <Router>
    <Switch>
      <Route path="/" exact={true} component={Home} />
      /*{/* <Route path="/products" exact={true} component={Product} />
      <Route path="/categories" exact={true} component={Category} />*/}*/
      <AdminRoute path="/admin" exact={true} component={AdminHome} />
      <AuthenticatedRoute path="/admin/view_users" exact={true} component={AdminViewUsers} />
      <AuthenticatedRoute path="/admin/view_users/user/:id" exact={true} component={UserProfile} />
      <Route path="/products" exact={true} component={Products} />
      <NonAuthenticatedRoute path="/login" exact component={LoginComponent} />
      <AuthenticatedRoute path="/logout" exact component={LogoutComponent} />

      <Route path="/products/:id" exact={true} component={ProductPage} />
      <AdminRoute path="/admin/addProduct" exact={true} component={postProductForm} />

    </Switch>
  </Router>
  );
}

export default App;
