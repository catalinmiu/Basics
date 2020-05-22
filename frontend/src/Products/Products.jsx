import React, { Component } from "react";
import AppNav from "../AppNav";
import { Card, CardDeck } from "react-bootstrap";
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
        <div style={{ textAlign: "center" }} className="mb-4">
          <h1>Products</h1>
        </div>
        <div className="container">
          {Products.map((product) => (
            <div>
              <CardDeck>
                <Card key={product.id}>
                  <Card.Img variant="top" src="holder.js/100px160" />
                  <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">{product.price}</small>
                  </Card.Footer>
                </Card>
                <Card>
                  <Card.Img variant="top" src="holder.js/100px160" />
                  <Card.Body>
                    <Card.Title>Card title</Card.Title>
                    <Card.Text>
                      This card has supporting text below as a natural lead-in
                      to additional content.{" "}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">
                      Last updated 3 mins ago
                    </small>
                  </Card.Footer>
                </Card>
                <Card>
                  <Card.Img variant="top" src="holder.js/100px160" />
                  <Card.Body>
                    <Card.Title>Card title</Card.Title>
                    <Card.Text>
                      This is a wider card with supporting text below as a
                      natural lead-in to additional content. This card has even
                      longer content than the first to show that equal height
                      action.
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">
                      Last updated 3 mins ago
                    </small>
                  </Card.Footer>
                </Card>
              </CardDeck>
            </div>
          ))}
        </div>
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
