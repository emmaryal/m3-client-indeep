import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./../App.css";
import authService from "../lib/auth-service";

class ChartsComponent extends Component {
  state = {};

  componentDidMount() {
    this.getCurrentUser();
    this.getNewReleases();
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
    const newReleases = recordsCopy.slice(Math.max(recordsCopy.length - 10, 0));

    this.setState({ newReleases: newReleases });
  };

  render() {
    const { newReleases } = this.props;

    return (
      <div className="charts-div">
        <p className="chart-text-title">new releases</p>
        {this.state.newReleases ? (
          this.state.newReleases.map((record) => {
            return (
              <div key={record._id} className="chart-list">
                <Link to={`/records/${record._id}`}>
                  <p className="chart-text">{record.title}</p>
                </Link>
                <p>artist: {record.artist} </p>
                <p>label:{record.label} </p>
                <p>Price: {record.price}€</p>
              </div>
            );
          })
        ) : (
          <h1>loading</h1>
        )}
      </div>
    );
  }
}

export default ChartsComponent;
