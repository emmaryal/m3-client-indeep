import React, { Component } from "react";

class Search extends Component {
  state = { search: "" };

  handleInput = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
    this.props.filterRecords(value);
  };
  render() {
    return (
      <div>
        <input
          className="input search-bar"
          type="text"
          name="search"
          value={this.state.search}
          placeholder="Search"
          onChange={this.handleInput}
        />
      </div>
    );
  }
}

export default Search;
