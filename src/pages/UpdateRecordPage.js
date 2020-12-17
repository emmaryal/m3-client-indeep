import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router";
import recordService from "./../lib/records-service";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

class UpdateRecordPage extends Component {
  state = {
    title: "",
    artist: "",
    format: "",
    label: "",
    mediaCondition: "",
    sleeveCondition: "",
    weight: "",
    catno: "",
    comments: "",
    image: "",
    price: 0,
  };

  componentDidMount() {
    this.getSingleRecord();
  }

  getSingleRecord = () => {
    const { id } = this.props.match.params;
    recordService
      .getOne(id)
      .then((data) => {

        const {
          listingId,
          title,
          artist,
          format,
          image,
          label,
          mediaCondition,
          sleeveCondition,
          weight,
          catno,
          comments,
          price,
        } = data;
        this.setState({
          listingId,
          title,
          artist,
          format,
          image,
          label,
          mediaCondition,
          sleeveCondition,
          weight,
          catno,

          comments,
          price,
        });
      })

      .catch((err) => console.log(err));
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const {
      title,
      artist,
      format,
      label,
      mediaCondition,
      sleeveCondition,
      weight,
      catno,
      image,
      comments,
      price,
    } = this.state;
    const { id } = this.props.match.params;

    axios
      .put(`${process.env.REACT_APP_API_URL}/api/records/${id}`, {
        title,
        artist,
        format,
        label,
        mediaCondition,
        sleeveCondition,
        weight,
        catno,
        image,
        comments,
        price,
      })
      .then(() => {
        this.getSingleRecord();
        this.props.history.push("/");
      })

      .catch((err) => console.log(err));
  };

  deleteRecord = () => {
    const { id } = this.props.match.params;

    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/records/${id}`)
      .then(() => this.props.history.push("/")) // causes Router URL change
      .catch((err) => console.log(err));
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <Container className="card">
        <Form className="forms-input" onSubmit={this.handleFormSubmit}>
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
          
          <input className = "btn-2 mb-2" variant="secondary" type="submit" value="Update Record" />
          <br />
          <Button className="btn-2 mb-2"variant="secondary" onClick={this.deleteRecord}>
            Delete Record
          </Button>
        </Form>
      </Container>
    );
  }
}

export default withRouter(UpdateRecordPage);
