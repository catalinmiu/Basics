import React, { Component } from "react";
import AppNav from "../AppNav";

class ProductPage extends Component {
  state = {
    Product: {},
    isLoading: true,
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    const response = await fetch(`/products/${id}`);
    const body = await response.json();
    this.setState({ Product: body, isLoading: false });
  }

  render() {
    const { Product, isLoading } = this.state;
    if (isLoading) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <AppNav />
        <div key={Product.id}>
          {Product.title} {Product.price} {Product.stock} {Product.description}
        </div>
      </div>
    );
  }
}

export default ProductPage;
