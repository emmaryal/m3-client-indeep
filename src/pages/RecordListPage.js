import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Search from "../components/Search";
import "./../App.css";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import authService from "../lib/auth-service";
import ChartsComponent from "../components/ChartsComponent";


class RecordListPage extends Component {
  state = {
    
    listOfRecords: [],
    currentRecords: [],
    newReleases: [],
    currentUser: null
  };

  getAllRecords = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/records/`)
      .then((apiResponse) => {
        this.setState({ listOfRecords: apiResponse.data });
        
      });
  };

  componentDidMount() {
    this.getAllRecords();
    this.getCurrentUser();
  
  }

  getCurrentUser = () => {
    authService
      .me()
      .then((data) => {
        const { email } = data;
        this.setState({ currentUser: email });
      })
      .catch((err) => console.log(err));
  };



  filterRecords = (input) => {
    const finder = this.state.listOfRecords.filter(
      (el) =>
        el.title.toLowerCase().includes(input.toLowerCase()) ||
        el.artist.toLowerCase().includes(input.toLowerCase()) ||
        el.label.toLowerCase().includes(input.toLowerCase())
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

  handleSortByAscPrice = () => {
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

  handleSortByDesPrice = () => {
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
    const { listOfRecords } = this.state;
    


    const totalRecords = listOfRecords.length;

    return (
      <div className="sort-list">
        <Search filterRecords={this.filterRecords} />

        <Button
          className="btn-2 mb-2"
          variant="outline secondary"
          onClick={this.getAllRecords}
        >
          Show All
        </Button>

        <Button
          className="btn-2 mb-2"
          variant="outline secondary"
          onClick={this.handleRandom}
        >
          Record of the Day
        </Button>
        <Button
          className="btn-2 mb-2"
          variant="outline secondary"
          onClick={this.handleSortByTitle}
        >
          Sort By Title
        </Button>
        <Button
          className="btn-2 mb-2"
          variant="outline secondary"
          onClick={this.handleSortByArtist}
        >
          Sort By Artist
        </Button>
        <Button
         className="btn-2 mb-2"
          variant="outline secondary"
          onClick={this.handleSortByLabel}
        >
          Sort By Label
        </Button>
        <Button
         className="btn-2 mb-2"
          variant="outline secondary"
          onClick={this.handleSortByAscPrice}
        >
          Sort By Price ☟
        </Button>
        <Button
          className="btn-2 mb-2"
          variant="outline secondary"
          onClick={this.handleSortByDesPrice}
        >
          Sort By Price ☟
        </Button>
        
        <Row>
          <Col sm={8}>
            <div>
             
              {listOfRecords.map((record) => (
                <div key={record._id} className="card">
               <Row>
                    <Col sm={6}>
                      <Link to={`/records/${record._id}`}>
                        <h6 className="indeepText">
                         {record.title}
                        </h6>
                      </Link>
                        {/* <ul  className="cardList" >
                          <li>Artist : {record.artist} </li>
                          <li>Label : {record.label} </li>
                          <li>Price : {record.price}€ </li>
                        </ul> */}

                      <p><b>Artist: </b> {record.artist} </p>
                      <p><b>Label: </b>{record.label}</p>
                      <p><b>Price: </b>{record.price}€</p> 
                   </Col>
                    <Col sm={4}>
                      {/* <img
                        style={{ width: "100px", padding: "10px" }}
                      src={record.img}
                         alt="record"
                      /> */}
                      <img
                        style={{ width: "100px", padding: "10px" }}
                        src="https://crossedcombs.typepad.com/.a/6a00e00980a6f38833017c37ab6210970b-pi"
                        alt="record"
                      />

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
          <Col  sm={4} >
            <p className="chart-text">new releases</p>
            {this.state.listOfRecords[0] ? (
              <ChartsComponent newReleases={this.state.listOfRecords} />
            ) : null}
         </Col>
        </Row>
      </div>
    );
  }
}

export default RecordListPage;
