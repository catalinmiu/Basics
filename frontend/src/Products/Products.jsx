import React, { Component } from "react";
import AppNav from "../AppNav";
class Products extends Component {
  state = {
    isLoading: true,
    Products: [],
  };

  async componentDidMount() {
    const response = await fetch("/products");
    const body = await response.json();
    this.setState({ isLoading: false, Products: body });
  }

  render() {
    const { isLoading, Products } = this.state;
    return (
      <div>
        <AppNav />
        {Products.map((product) => (
          <div key={product.id}>
            <h3>{product.title}</h3>
          </div>
        ))}
      </div>
    );
  }
}

export default Products;
