import React, { Component } from "react";
import axios from "axios";

class AddRecordPage extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "", artist: "" };
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { title, artist } = this.state;

    axios
      .post("http://localhost:5000/api/records", { title, artist })
      .then(() => {
        this.props.getData(); // leave this comment - we will used it later
        this.setState({ title: "", artist: "" });
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
            onChange={(e) => this.handleChange(e)}
          />

<input
            type="text"
            name="artist"
            value={this.state.artist}
            onChange={(e) => this.handleChange(e)}
          />

          <input type="submit" value="Add Record" />
        </form>
      </div>
    );
  }
}

export default AddRecordPage;
