import React, { Component } from "react";
import { Form, Col, Button } from "react-bootstrap";
import AppNav from "../AppNav";
import axios from "axios";
import AuthenticationService from "../service/AuthenticationService.js";

class postProductForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      stock: "",
      price: "",
      category: "",
      Categories: [],
      image: "",
      base64: ""
    };
  }

  async componentDidMount() {
    const response = await fetch("/categories");
    const body = await response.json();
    this.setState({ Categories: body });
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  changeHandlerFile = (e) => {
    var file = e.target.files[0];
    let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        this.setState({
          file: file,
          base64: reader.result
        });
        //this.handleSubmit()
      };
      this.setState({ [e.target.name]: e.target.files[0] });
    };

  changeHandlerSelect = (e) => {
    var element = document.getElementById("formCategory");
    this.setState({
      [e.target.name]: element.options[element.selectedIndex].value,
    });
  };

  submitHandler = (e) => {
    const category = {
      id: this.state.category,
    };
    const data = {
      title: this.state.title,
      description: this.state.description,
      stock: this.state.stock,
      price: this.state.price,
      category: category,
      image: this.state.base64,
      score: 0
    };
    console.log(data);
    e.preventDefault();
    console.log(this.state);
    var config = {
      headers: {
        "Access-Control-Allow-Origin": true,
        "Access-Control-Allow-Methods": "OPTIONS,GET,PUT,POST,DELETE",
        "Access-Control-Allow-Headers": "X-Requested-With, Content-Type",
        Authorization: AuthenticationService.getToken(),
      },
    };
    axios
      .post("http://localhost:8081/products", data, config)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { title, description, stock, price, category } = this.state;
    const { Categories } = this.state;
    return (
      <div>
        <AppNav />
        <div className="container mt-4">
          <Form>
            <Form.Row>
              <Form.Group as={Col} controlId="formProductName">
                <Form.Label>Product Name aaa</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product name"
                  name="title"
                  value={title}
                  onChange={this.changeHandler}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as="select"
                  name="category"
                  onChange={this.changeHandler}
                >
                  <option value="0" disabled selected>
                    Alege o optiune
                  </option>
                  {/*<option value={category}>Bluze</option>
                  <option value={category}>T-shirt</option> */}
                  {Categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.title}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows="7"
                placeholder="Description"
                name="description"
                value={description}
                onChange={this.changeHandler}
              />
            </Form.Group>
            {/* <Form.Group controlId="formGridAddress2">
                  <Form.Label>Address 2</Form.Label>
                  <Form.Control placeholder="Apartment, studio, or floor" />
                </Form.Group> */}
            <Form.Row>
              <Form.Group as={Col} controlId="formStock">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="0"
                  name="stock"
                  value={stock}
                  onChange={this.changeHandler}
                />
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
                <Form.Control
                  type="number"
                  placeholder="0"
                  name="price"
                  value={price}
                  onChange={this.changeHandler}
                />
              </Form.Group>
            </Form.Row>
            <div class="col-md-6">
                    <input type="file" name="image" onChange={this.changeHandlerFile}/>
                </div>
            <Button
              variant="primary"
              type="button"
              onClick={this.submitHandler}
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default postProductForm;
