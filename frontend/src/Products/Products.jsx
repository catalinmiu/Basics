import React, { Component } from "react";
import AppNav from "../AppNav";
import { Card, CardDeck, Row, Col } from "react-bootstrap";
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
    let productGroup = [];
    let allProductsGrouped = [];
    for (const [index, value] of Products.entries()) {
      productGroup.push(value);
      if ((index + 1) % 3 === 0) {
        allProductsGrouped.push(productGroup);
        productGroup = [];
      } else if (index + 1 == Products.length && productGroup.length != 0) {
        allProductsGrouped.push(productGroup);
      }
    }
    console.log(allProductsGrouped);
    return (
      <div>
        <AppNav />
        <div style={{ textAlign: "center" }} className="mb-4">
          <h1>Products</h1>
        </div>
        <div className="container">
          {allProductsGrouped.map((products, rowIndex) => (
            <Row key={rowIndex}>
              {products.map((product) => (
                <Col className="col-xs-12 col-sm-4 mb-3" key={product.id}>
                  <Card>
                    <Card.Img variant="top" src="/images/cat.jpg" />
                    <Card.Body>
                      <Card.Title>
                        <a href={"/products/" + product.id}>{product.title}</a>
                      </Card.Title>
                      <Card.Text>{product.description}</Card.Text>
                    </Card.Body>
                    <Card.Footer style={{ textAlign: "center" }}>
                      <small className="text-muted">{product.price}$</small>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
          ))}
        </div>
        {/* {Products.map((product) => (
          <div key={product.id}>
            <h3>{product.title}</h3>
          </div>
        ))} */}
      </div>
    );
  }
}

export default Products;
