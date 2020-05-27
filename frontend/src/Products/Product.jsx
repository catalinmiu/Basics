import React, { Component } from "react";
import AppNav from "../AppNav";
import { Row, Col } from "react-bootstrap";

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
        <div className="container" key={Product.id}>
          <Row>
            <Col className="col-xs-6">
              <img src="/images/cat.jpg" alt="" />
            </Col>
            <Col className="col-xs-6">
              <div>
                <h1 style={{ display: "block" }}>{Product.title}</h1>
                <h2 style={{ display: "block" }}>Price: {Product.price}</h2>
              </div>
            </Col>
          </Row>
          <div>
            <h2>Description :</h2>
            {Product.price} {Product.stock} {Product.description}
          </div>
        </div>
      </div>
    );
  }
}

export default ProductPage;
