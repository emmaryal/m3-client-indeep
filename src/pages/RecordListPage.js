import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Search from "../components/Search";
import PrivateRoute from "../components/PrivateRoute";
//import Charts from "./../components/charts"
import "./../App.css"
//import RecordDetails from "./../components/RecordDetails"
import { withAuth } from "./../context/auth-context";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import authService from "../lib/auth-service";

class RecordListPage extends Component {
  state = {
    listOfRecords: [],
    sortedList: [],
    randomRecord: {},
    currentUser:null,
  };
  getAllRecords = () => {
    axios.get(`http://localhost:5000/api/records`).then((apiResponse) => {
      this.setState({ listOfRecords: apiResponse.data });
    });
  };
  componentDidMount() {
    this.getAllRecords();
    this.getCurrentUser();
    
    
    
    //  fetch the data from API after the initial render, and save it in the state
  }
  getCurrentUser = () => {
    authService.me()
    .then((data)=>{
      const {email} = data;
      console.log("data from promise:", data)
      this.setState({currentUser: email  });
      console.log("this.state:", this.state)
    })
    .catch((err) => console.log(err));
};

  filterRecords = (input) => {
    const finder = this.state.listOfRecords.filter(
      (el) =>
        el.title
          .toLowerCase()
          .includes(
            input.toLowerCase()
          ) /* ||
        el.artist.toLowerCase().includes(input.toLowerCase()) ||
        el.label.toLowerCase().includes(input.toLowerCase()) */
    );

    this.setState({ listOfRecords: finder });
  };

handleRandom = () => {
    const randomIndex = Math.floor(this.state.listOfRecords.length * Math.random());
    const randomRecord = this.state.listOfRecords[randomIndex];
    this.setState({listOfRecords : randomRecord });
    console.log(randomIndex)
    console.log(randomRecord)
    this.filterRecords(randomRecord.title)
    
    return;
  }

  handleSortByTitle = () => {
    const sortedTitle = this.state.listOfRecords.sort((x, y) => {
      return x.title.toLowerCase - y.title.toLowerCase;
    });
    this.setState([...sortedTitle] );
    console.log(this.state.listOfRecords)
    console.log("sorted by title",sortedTitle)
  };

  handleSortByArtist = () => {
    const sortedArtist = this.state.listOfRecords.sort((x, y) => {
      return x.artist.toLowerCase - y.artist.toLowerCase;
    });
    console.log(sortedArtist);
    this.setState({ listOfRecords: sortedArtist });

    return;
  };
  handleSortByLabel = () => {
    const sortedLabel = this.state.listOfRecords.sort((x, y) => {
      return x.label.toLowerCase - y.label.toLowerCase;
    });
    this.setState({ listOfRecords: sortedLabel });
  };

  handleSortByAscPrice = () => {
    const sortedAscPrice = this.state.listOfRecords.sort((x, y) => {
      return x.price - y.price;
    });

    this.setState([...sortedAscPrice]);

    return;
  };
  handleSortByDesPrice = () => {
    const sortedDesPrice = this.state.listOfRecords.sort((x, y) => {
      return y.price - x.price;
    });

    this.setState([...sortedDesPrice]);

    return;
  };

  render() {
    // deconstruct value from the `state`
    const { listOfRecords } = this.state; //  <--  ADD

    return (
      <div>
        
        <Search filterRecords={this.filterRecords} />

        <Button
          className="mb-2"
          variant="outline secondary"
          onClick={this.getAllRecords}
        >Show All
        </Button>

        <Button
          className="mb-2"
          variant="outline secondary"
          onClick={this.handleRandom}
        >
          Record of the Day
        </Button>
        <Button
          className="mb-2"
          variant="outline secondary"
          onClick={this.handleSortByTitle}
        >
          Sort By Title
        </Button>
        <Button
          className="mb-2"
          variant="outline secondary"
          onClick={this.handleSortByArtist}
        >
          Sort By Artist
        </Button>
        <Button
          className="mb-2"
          variant="outline secondary"
          onClick={this.handleSortByLabel}
        >
          Sort By Label
        </Button>
        <Button
          className="mb-2"
          variant="outline secondary"
          onClick={this.handleSortByAscPrice}
        >
          Sort By Price (ascending)
        </Button>
        <Button
          className="mb-2"
          variant="outline secondary"
          onClick={this.handleSortByDesPrice}
        >
          Sort By Price (descending)
        </Button>
<Row><Col sm={8}>
        <div className="record-list">
          {listOfRecords.map((record) => (
            <div key={record._id} className="record">
              <Link to={`/records/${record._id}`}>
                <h5 className="indeepText">Record Title : {record.title}</h5>
              </Link>
              <p>Artist : {record.artist} </p>
              <p>Price: {record.price}€</p>
              {record.favoritedBy ? (
                <p>Popularity: {record.favoritedBy.length}</p>
              ) : (
                <p>popularity: 0</p>
              )}
 
  {(this.state.currentUser === "admin")?(
              <Link to={`/records/edit/${record._id}`}>
                <p>Update or Delete this record</p>
              </Link>):null }
            </div>
          ))}


        </div>
        </Col>
        <Col sm={4}>
        <h3>charts</h3>
do a mapping here of most popular
{/* <Charts /> */}
        </Col>
        </Row>
      </div>
      
    );
  }
}

export default RecordListPage;
