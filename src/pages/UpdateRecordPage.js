import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router";
import recordService from "./../lib/records-service";

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
    image: "",
    price: 0
  };

////////

componentDidMount() {
  this.getSingleRecord();
}

getSingleRecord = () => {
  const { id } = this.props.match.params;
  console.log("id:", id);
  recordService
    .getOne(id)
    .then((data) => {
      console.log(data);
 
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
        price
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
        price
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
      price
    } = this.state;
    const { id } = this.props.match.params;

    axios
      .put(`http://localhost:5000/api/records/${id}`, {
        title,
        artist,
        format,
        label,
        mediaCondition,
        sleeveCondition,
        weight,
        catno,
        image,
        price
      })
      .then(() => {
        this.getSingleRecord();
       
      })
      .catch((err) => console.log(err));
  };

  deleteRecord = () => {
   
    const { id } = this.props.match.params;

    axios
      .delete(`http://localhost:5000/api/records/${id}`)
      .then(() => this.props.history.push("/records")) // causes Router URL change
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

          <input type="submit" value="Update Record" />
        </form>
        <button onClick={this.deleteRecord}>Delete Record</button>
      </div>
    );
  }
}

export default withRouter(UpdateRecordPage);
