import React, { Component } from "react";
import { withAuth } from "./../context/auth-context";
import { Link } from "react-router-dom";
import RecordListPage from "./RecordListPage";
import authService from "../lib/auth-service";
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
        this.setState({ currentUser: _id });
        this.setState({ userObj: data });
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
           <h4>{/*Welcome {this.props.user && this.props.user.email*/}</h4>
<br /> 
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
