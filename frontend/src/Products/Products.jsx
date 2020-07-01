import React, { Component } from "react";
import AppNav from "../AppNav";
import { Card, Form, Row, Col } from "react-bootstrap";
// import history from "../history";
import { createBrowserHistory } from "history";
// export const history = createBrowserHistory({});
import { Redirect } from "react-router-dom";

class Products extends Component {
  state = {
    isLoading: true,
    Products: [],
    Categories: [],
    category: "",
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    console.log(id);
    console.log(typeof Response);
    if (id !== undefined) {
      const response = await fetch(`/categories/${id}/products`);
      const body = await response.json();
      const responseCateroies = await fetch("/categories");
      const bodyCategories = await responseCateroies.json();
      this.setState({
        isLoading: false,
        Products: body,
        Categories: bodyCategories,
      });
    } else {
      const response = await fetch("/products");
      const body = await response.json();
      const responseCateroies = await fetch("/categories");
      const bodyCategories = await responseCateroies.json();
      this.setState({
        isLoading: false,
        Products: body,
        Categories: bodyCategories,
      });
    }
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log("AAA");
    return <Redirect to="/login" />;
  };

  render() {
    const { isLoading, Products, Categories } = this.state;
    let productGroup = [];
    let allProductsGrouped = [];
    for (const [index, value] of Products.entries()) {
      productGroup.push(value);
      if ((index + 1) % 3 === 0) {
        allProductsGrouped.push(productGroup);
        productGroup = [];
      } else if (index + 1 === Products.length && productGroup.length !== 0) {
        allProductsGrouped.push(productGroup);
      }
    }
    // console.log(allProductsGrouped);
    return (
      <div>
        <AppNav />
        <select
          className="dropdown mt-4"
          name="category"
          onChange={this.changeHandler}
        >
          <option value="none" selected disabled>
            Group by category
          </option>
          {Categories.map((category) => (
            <option value={category.id} key={category.id}>
              {category.title}
            </option>
          ))}
        </select>
        <div style={{ textAlign: "center" }} className="mb-4">
          <h1>Products</h1>
        </div>
        <div className="container">
          {allProductsGrouped.map((products, rowIndex) => (
            <Row key={rowIndex}>
              {products.map((product) => (
                <Col className="col-xs-12 col-sm-4 mb-3" key={product.id}>
                  <Card>
                    <a href={"/products/" + product.id}>
                          <Card.Img variant="top" src={product.image} />
                    </a>
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
