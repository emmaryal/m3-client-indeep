import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./../App.css";
import authService from "../lib/auth-service";

class ChartsComponent extends Component {
  state = {};

  componentDidMount() {
    this.getCurrentUser();
    this.getNewReleases()
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

  getNewReleases = () => {
    const recordsCopy = [...this.props.newReleases];
    console.log(this.props)
    const newReleases = recordsCopy.slice(Math.max(recordsCopy.length-10, 0));

    this.setState({ newReleases: newReleases });
    
  };
  /*   filterRecords = (input) => {
    const finder = this.state.listOfRecords.filter(
      (el) =>
        el.title
          .toLowerCase()
          .includes(
            input.toLowerCase()
          ) 
    );

    this.setState({ listOfRecords: finder });
  };

  handleSortByPopularity = () => {
    const topTen = this.state.listOfRecords.sort((x, y) => {
      return x.popularity - y.popularity;
    });
    this.setState({ listOfRecords: topTen });
  }; */

  render() {
    const { newReleases } = this.props;

    return (
      <div>
        {/*  {this.props.listOfRecords.map((recordObj) => {
            return <p key={recordObj._id}>{recordObj.title}</p>;
          })} */}

        {this.state.newReleases?this.state.newReleases.map((record) => {
          return (
            <div key={record._id} className="card">
              <Link to={`/records/${record._id}`}>
                <p className="chart-text">{record.title}</p>
              </Link>
              <span>artist: {record.artist} </span>
              <br />
              <span>label:{record.label} </span>
              <p>Price: {record.price}€</p>
            </div>
          );
        }):<h1>loading</h1>}
      </div>
    );
  }
}

export default ChartsComponent;
