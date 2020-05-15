import React, {Component} from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import AdminHome from "./Admin/AdminHome"
import AdminViewUsers from "./Admin/AdminViewUsers"
import UserProfile from "./User/UserProfile"
import Products from "./Products/Products"
import ProductPage from "./Products/Product"
import addProduct from "./Products/addProduct"

function App() {
  return (
    <Router>
    <Switch>
      <Route path="/" exact={true} component={Home} />
      {/* <Route path="/products" exact={true} component={Product} />
      <Route path="/categories" exact={true} component={Category} />*/}
      <Route path="/admin" exact={true} component={AdminHome} /> 
      <Route path="/admin/view_users" exact={true} component={AdminViewUsers} />
      <Route path="/admin/view_users/user/:id" exact={true} component={UserProfile} />
      <Route path="/products" exact={true} component={Products} />
      <Route path="/products/:id" exact={true} component={ProductPage} />
      <Route path="/admin/addProduct" exact={true} component={addProduct} />

    </Switch>
  </Router>
  );
}

export default App;
