import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Search from "../components/Search";
import PrivateRoute from "../components/PrivateRoute";
//import Charts from "./../components/charts"
import "./../App.css";
//import RecordDetails from "./../components/RecordDetails"
import { withAuth } from "./../context/auth-context";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import authService from "../lib/auth-service";

import ChartsComponent from "../components/ChartsComponent";

class RecordListPage extends Component {
  state = {
    listOfRecords: [],
    newReleases: [],
    randomRecord: {},
    currentUser: null,
  };
  getAllRecords = () => {
    axios.get(`http://localhost:5000/api/records`).then((apiResponse) => {
      this.setState({ listOfRecords: apiResponse.data });
    });
  };

  getNewReleases= () => {
    const newReleases = this.state.listOfRecords.slice(100,110);
    this.setState({newReleases: newReleases})
  }



  componentDidMount() {
    this.getAllRecords();
    this.getCurrentUser();
    this.getNewReleases();
  }
  getCurrentUser = () => {
    authService
      .me()
      .then((data) => {
        const { email } = data;
        console.log("data from promise:", data);
        this.setState({ currentUser: email });
        console.log("this.state:", this.state);
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
    const randomIndex = Math.floor(
      this.state.listOfRecords.length * Math.random()
    );
    const randomRecord = this.state.listOfRecords[randomIndex];
    this.setState({ listOfRecords: randomRecord });
    console.log(randomIndex);
    console.log(randomRecord);
    this.filterRecords(randomRecord.title);

    return;
  };

  handleSortByTitle = () => {
    const listOfRecordsCopy = [...this.state.listOfRecords];
    listOfRecordsCopy.sort((a, b) => {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();

      if (titleA < titleB) {
        // sort strings in ascending order
        return -1;
      }
      if (titleA > titleB) {
        return 1;
      }
      return 0; // if strings are the same
    });

    this.setState({ listOfRecords: listOfRecordsCopy });
  };

  handleSortByArtist = () => {
    const listOfRecordsCopy = [...this.state.listOfRecords];
    listOfRecordsCopy.sort((a, b) => {
      const artistA = a.artist.toLowerCase();
      const artistB = b.artist.toLowerCase();

      if (artistA < artistB) {
        // sort strings in ascending order
        return -1;
      }
      if (artistA > artistB) {
        return 1;
      }
      return 0; // if strings are the same
    });

    this.setState({ listOfRecords: listOfRecordsCopy });
  };
  handleSortByLabel = () => {
    const listOfRecordsCopy = [...this.state.listOfRecords];
    listOfRecordsCopy.sort((a, b) => {
      const labelA = a.label.toLowerCase();
      const labelB = b.label.toLowerCase();

      if (labelA < labelB) {
        // sort strings in ascending order
        return -1;
      }
      if (labelA > labelB) {
        return 1;
      }
      return 0; // if strings are the same
    });

    this.setState({ listOfRecords: listOfRecordsCopy });
  };

  handleSortByAscPrice= () => {
    const listOfRecordsCopy = [...this.state.listOfRecords];
    listOfRecordsCopy.sort((a, b) => {
      const priceA = a.price;
      const priceB = b.price;

      if (priceA < priceB) {
        // sort strings in ascending order
        return -1;
      }
      if (priceA > priceB) {
        return 1;
      }
      return 0; // if strings are the same
    });

    this.setState({ listOfRecords: listOfRecordsCopy });
  };
  
  
  
  
  
  
  handleSortByDesPrice= () => {
    const listOfRecordsCopy = [...this.state.listOfRecords];
    listOfRecordsCopy.sort((a, b) => {
      const priceA = a.price;
      const priceB = b.price;

      if (priceA < priceB) {
        // sort strings in ascending order
        return 1;
      }
      if (priceA > priceB) {
        return -1;
      }
      return 0; // if strings are the same
    });

    this.setState({ listOfRecords: listOfRecordsCopy });
  };
  

  render() {
    const { listOfRecords } = this.state; //  <--  ADD

    return (
      <div>
        <Search filterRecords={this.filterRecords} />

        <Button
          className="mb-2"
          variant="outline secondary"
          onClick={this.getAllRecords}
        >
          Show All
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
        <Row>
          <Col sm={10}>
            <div>
              {listOfRecords.map((record) => (
                <div key={record._id} className="card">
                  <Row>
                    <Col sm={8}>
                      <Link to={`/records/${record._id}`}>
                        <h5 className="indeepText">
                          Record Title : {record.title}
                        </h5>
                      </Link>
                      <p>Artist : {record.artist} </p>
                      <p>Price: {record.price}€</p>
                    </Col>
                    <Col sm={4}>
                      <img
                        style={{ width: "100px", padding: "10px" }}
                        src="https://crossedcombs.typepad.com/.a/6a00e00980a6f38833017c37ab6210970b-pi"
                      />
                      <img
                        style={{ width: "100px", padding: "10px" }}
                        src="https://crossedcombs.typepad.com/.a/6a00e00980a6f38833017c37ab6210970b-pi"
                      />
                      {record.favoritedBy ? (
                        <p>Popularity: {record.favoritedBy.length}</p>
                      ) : (
                        <p>popularity: 0</p>
                      )}

                      {this.state.currentUser === "admin" ? (
                        <Link to={`/records/edit/${record._id}`}>
                          <p>Update or Delete this record</p>
                        </Link>
                      ) : null}
                    </Col>{" "}
                  </Row>
                </div>
              ))}
            </div>
          </Col>
          <Col sm={2}>
            <h3>new releases</h3>
            
            <ChartsComponent newReleases={this.state.newReleases} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default RecordListPage;
