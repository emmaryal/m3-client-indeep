import React, { Component } from "react";
import axios from "axios";

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
      .post("http://localhost:5000/api/records", {
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
        this.props.history.push("/records");
      })

      .catch((err) => console.log(err));
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
          />

          <label>Artist:</label>
          <input
            type="text"
            name="artist"
            value={this.state.artist}
            onChange={this.handleChange}
          />

          <label>Format:</label>
          <input
            type="text"
            name="format"
            value={this.state.format}
            onChange={this.handleChange}
          />

          <label>Media Condition:</label>
          <input
            type="text"
            name="mediaCondition"
            value={this.state.mediaCondition}
            onChange={this.handleChange}
          />

          <label>Sleeve Condition:</label>
          <input
            type="text"
            name="sleeveCondition"
            value={this.state.sleeveCondition}
            onChange={this.handleChange}
          />

          <label>Weight:</label>
          <input
            type="text"
            name="weight"
            value={this.state.weight}
            onChange={this.handleChange}
          />
          <label>Comments:</label>
          <input
            type="text"
            name="comments"
            value={this.state.comments}
            onChange={this.handleChange}
          />

          <label>Catalogue Number:</label>
          <input
            type="text"
            name="catno"
            value={this.state.catno}
            onChange={this.handleChange}
          />

          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={this.state.price}
            onChange={this.handleChange}
          />

          <input type="submit" value="Add Record" />
        </form>
      </div>
    );
  }
}

export default AddRecordPage;
