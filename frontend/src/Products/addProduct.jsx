import React, { Component } from "react";
import AppNav from "../AppNav";
import { Form, Col, Button } from "react-bootstrap";
import { createProduct } from "./createProduct";

const initialstate = {
  title: "",
  desc: "",
  stock: "",
  price: "",
  category: "",
  Categories: []
};

class addProduct extends Component {
  constructor(props) {
    super(props);
    this.state = initialstate;
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const response = await fetch("/categories");
    const body = await response.json();
    this.setState({ isLoading: false, Categories: body });
  }

  onChange(e) {
    if (e.target.id === "title") {
      this.setState({ title: e.target.value });
    } else if (e.target.id === "desc") {
      this.setState({ desc: e.target.value });
    } else if (e.target.id === "stock") {
      this.setState({ stock: e.target.value });
    } else if (e.target.id === "price") {
      this.setState({ price: e.target.value });
    } else if (e.target.id === "category") {
      this.setState({ category: e.target.value });
      console.log(e.target.value);
    }
  }

  handleSubmit() {
    const product = {
      title: this.state.title,
      description: this.state.desc,
      stock: this.state.stock,
      price: this.state.price,
      category: 1,
    };
    alert(product.title);
    createProduct(product);
    // setErrorText(undefined);
    // setTodoDialogOpen(false);
  }

  //   onChange(e) {
  //     this.setState({
  //       [e.target.name]: e.target.value,
  //     });
  //   }

  //   onSubmit(e) {
  //     e.preventDefault();

  //     fetch(this.props.formAction, {
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ title: this.state.description }),
  //     });

  //     this.setState({ description: "" });
  //   }

  render() {
    const { Categories } = this.state;
    return (
      <div>
        <AppNav />
        <div className="container mt-4">
          <Form
            onSubmit={this.handleSubmit}
            // action={this.props.action}
            // method={this.props.method}
            // onSubmit={this.onSubmit}
          >
            <Form.Row>
              <Form.Group as={Col} controlId="formProductName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control type="text" placeholder="Enter product name" />
              </Form.Group>

              <Form.Group as={Col} controlId="formCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control as="select">
                  {Categories.map((category) => (
                    <option key={category.id}>{category.title}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows="7" placeholder="Description" />
            </Form.Group>
            {/* <Form.Group controlId="formGridAddress2">
              <Form.Label>Address 2</Form.Label>
              <Form.Control placeholder="Apartment, studio, or floor" />
            </Form.Group> */}
            <Form.Row>
              <Form.Group as={Col} controlId="formStock">
                <Form.Label>Stock</Form.Label>
                <Form.Control type="number" placeholder="0" />
              </Form.Group>

              {/* <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Stock</Form.Label>
                <Form.Control as="select" value="Choose...">
                  <option>Choose...</option>
                  <option>...</option>
                </Form.Control>
              </Form.Group> */}

              <Form.Group as={Col} controlId="formPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" placeholder="0" />
              </Form.Group>
            </Form.Row>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

addProduct.defaultProps = {
  action: "http://don.healthedata.com/admin/login",
  method: "post",
};

export default addProduct;
