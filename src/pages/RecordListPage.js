import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Search from "../components/Search";
//import RecordDetails from "./../components/RecordDetails"

class RecordListPage extends Component {
  state = {
    listOfRecords: [],
  };
  getAllRecords = () => {
    axios.get(`http://localhost:5000/api/records`).then((apiResponse) => {
      this.setState({ listOfRecords: apiResponse.data });
    });
  };
  componentDidMount() {
    this.getAllRecords();
    //  fetch the data from API after the initial render, and save it in the state
  }
  filterRecords = (input) => {
    const finder = this.state.listOfRecords.filter((el) =>
      el.title.toLowerCase().includes(input.toLowerCase())
    );
    this.setState({ listOfRecords: finder });
  };
  render() {
    // deconstruct value from the `state`
    const { listOfRecords } = this.state; //  <--  ADD

    return (
      <div>
        <Search filterRecords={this.filterRecords} />
        <div id="record-list">
          {listOfRecords.map((record) => (
            <div key={record._id} className="record">
              <Link to={`/records/${record._id}`}>
              
                <h3>Record Title : {record.title}</h3>
                <p>Artist : {record.artist} </p>
                <p>Price: {record.price}€</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default RecordListPage;
