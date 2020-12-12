import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Search from "../components/Search";
import PrivateRoute from "../components/PrivateRoute";
//import RecordDetails from "./../components/RecordDetails"

class RecordListPage extends Component {
  state = {
    listOfRecords: [],
    count:0
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

  /*  handleRandom = () => {
    const randomIndex = Math.floor(contacts.length * Math.random());
    const randomContact = contacts[randomIndex];
    this.setState({ contacts: [...this.state.contacts, randomContact] });
    return;
  }; */

  handleSortByTitle = () => {
    const sortedTitle = this.state.title.sort((x, y) => {
      return x.title - y.title;
    });
    this.setState({ title: sortedTitle });
  };

  /* handleSortByArtist = () => {
    const sortedName = this.state.contacts.sort((x, y) => {
      return x.name - y.name;
    });

    this.setState([...sortedName]);

    return;
  }; */
  /* handleSortByLabel = () => {
    const sortedPop = this.state.contacts.sort((x, y) => {
      return x.popularity - y.popularity;
    });
    this.setState({ contacts: sortedPop });
  }; */

/*   handleSortByAscPrice = () => {
    const sortedName = this.state.contacts.sort((x, y) => {
      return x.name - y.name;
    });

    this.setState([...sortedName]);

    return;
  };

  handleSortByDesPrice = () => {
    const sortedName = this.state.contacts.sort((x, y) => {
      return x.name - y.name;
    });

    this.setState([...sortedName]);

    return;
  }; */

  render() {
    // deconstruct value from the `state`
    const { listOfRecords } = this.state; //  <--  ADD

    return (
      <div>
      <button onClick={this.handleRandom}>Record of the Day</button>
        <button onClick={this.handleSortByTitle}>Sort By Title</button>
       {/*  <button onClick={this.handleSortByArtist}>Sort By Artist</button>
        <button onClick={this.handleSortByLabel}>Sort By Label</button>
        <button onClick={this.handleSortByAscPrice}>Sort By Price (ascending)</button>
        <button onClick={this.handleSortByDesPrice}>Sort By Price (descending)</button> */}
        <Search filterRecords={this.filterRecords} />
        <div id="record-list">
          {listOfRecords.map((record) => (
            <div key={record._id} className="record">
              <Link to={`/records/${record._id}`}>
              
                <h3>Record Title : {record.title}</h3></Link>
                <p>Artist : {record.artist} </p>
                <p>Price: {record.price}€</p>
                {record.favoritedBy ? <p>Popularity: {record.favoritedBy.length}</p> : <p>popularity: 0</p>}
             
              
              <Link to={`/records/edit/${record._id}`}>
              <p>Update or Delete this record</p>
              </Link>
            

              
              </div>
          ))}
        </div>
      </div>
    );
  }
}

export default RecordListPage;
