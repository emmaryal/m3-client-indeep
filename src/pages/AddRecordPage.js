import React, { Component } from "react";
import axios from "axios";
import {Redirect} from "react-router-dom";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

import Container from "react-bootstrap/Container"

class AddRecordPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      artist: "",
      format: "",
      image: "",
      label: "",
      mediaCondition: "",
      sleeveCondition: "",
      weight: "",
      comments: "",
      catno: "",
      price: 0,
    };
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const {
      title,
      artist,
      format,
      image,
      label,
      mediaCondition,
      sleeveCondition,
      weight,
      comments,
      catno,
      price,
    } = this.state;

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/records`, {
        title,
        artist,
        format,
        image,
        label,
        mediaCondition,
        sleeveCondition,
        weight,
        comments,
        catno,
        price,
      }, {withCredentials:true})
      .then(() => {
        this.setState({
          title: "",
          artist: "",
          format: "",
          image: "",
          label: "",
          mediaCondition: "",
          sleeveCondition: "",
          weight: "",
          comments: "",
          catno: "",
          price: 0,
        });
        this.props.history.push("/");
      })

      .catch((err) => console.log(err));
      return <Redirect to="/" />
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <Container className = "card">
      <Form className= "forms-input" onSubmit={this.handleFormSubmit}>
        <Form.Row>
          <Form.Group as={Col} controlId="exampleForm.ControlTitle">
            <Form.Label>Title:</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="exampleForm.ControlLabel">
            <Form.Label>Artist:</Form.Label>
            <Form.Control
              type="text"
              name="artist"
              value={this.state.artist}
              onChange={this.handleChange}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="exampleForm.ControlmediaCond">
            <Form.Label>Media Condition:</Form.Label>
            <Form.Control
              type="text"
              name="mediaCondition"
              value={this.state.mediaCondition}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="exampleForm.ControlsleeveCond">
            <Form.Label>Sleeve Condition:</Form.Label>
            <Form.Control
              type="text"
              name="sleeveCondition"
              value={this.state.sleeveCondition}
              onChange={this.handleChange}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="exampleForm.ControlFormat">
            <Form.Label>Format:</Form.Label>
            <Form.Control
              type="text"
              name="format"
              value={this.state.format}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="exampleForm.ControlWeight">
            <Form.Label>Weight (grammes):</Form.Label>
            <Form.Control
              type="text"
              name="weight"
              value={this.state.weight}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="exampleForm.ControlCatNo">
            <Form.Label>Catalogue Number:</Form.Label>
            <Form.Control
              type="text"
              name="catno"
              value={this.state.catno}
              onChange={this.handleChange}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md={8} controlId="exampleForm.ControlComments">
            <Form.Label>Comments:</Form.Label>
            <Form.Control
              type="textarea"
              name="comments"
              value={this.state.comments}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} md={4} controlId="exampleForm.ControlPrice">
            <Form.Label>Price (€):</Form.Label>
            <Form.Control
              id="price-field"
              type="text"
              name="price"
              value={this.state.price}
              onChange={this.handleChange}
            />
          </Form.Group>
        </Form.Row>

          <input variant = "secondary" type="submit" value="Add Record" />
        </Form>
      </Container>
    );
  }
}

export default AddRecordPage;
