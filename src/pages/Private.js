import React, { Component } from "react";
import { withAuth } from "./../context/auth-context";

import { Home } from "@material-ui/icons";
import { Link } from "react-router-dom";
import RecordListPage from "./RecordListPage";
import authService from "../lib/auth-service";
import recordService from "../lib/records-service";
import MyFavourites from "../components/MyFavourites";

class Private extends Component {
  state = { currentUser: null, userObj: {} };

  componentDidMount() {
    this.getCurrentUser();
  }

  getCurrentUser = () => {
    authService
      .me()
      .then((data) => {
        const { _id } = data;
        console.log("data from promise:", data);
        this.setState({ currentUser: _id });
        this.setState({userObj: data});
        console.log("this.state:", this.state);
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        {this.state.userObj.name === "admin" ? (
          <Link to="/records/add">
            <button className="btn-2 mb-2">Add Record</button>{" "}
          </Link>
        ) : (
          <div>
            <h4>Welcome {this.props.user && this.props.user.email}</h4>
         

        <div>
          <MyFavourites currentUser={this.props.user._id} />
        </div>
        </div>
        )}
        <br />

        <RecordListPage />
      </div>
    );
  }
}

export default withAuth(Private);
