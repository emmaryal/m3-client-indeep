import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Search from "./Search";
import PrivateRoute from "./PrivateRoute";
import "./../App.css";
import authService from "../lib/auth-service";

class ChartsComponent extends Component {
  state = {};

  componentDidMount() {
    this.getCurrentUser();
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
    
        
        <div >
          
           {/*  {this.props.listOfRecords.map((recordObj) => {
            return <p key={recordObj._id}>{recordObj.title}</p>;
          })} */}

          {this.props.newReleases.map((record) => {
            return(
            <div key={record._id} className="chart-list">
            
              <Link to={`/records/${record._id}`}>
                <p className = "chart-text">{record.title}</p>
              </Link>
              <span>artist: {record.artist} </span>
              <br />
              <span>label:{record.label} </span>
              <p>Price: {record.price}€</p>
            </div>);
          })}
        </div>
      
    );
  }
}

export default ChartsComponent;
