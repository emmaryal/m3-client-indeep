import React, { Component } from "react";
import { withAuth } from "./../context/auth-context";
import UpdateRecordPage from "./UpdateRecordPage";
import AddRecordPage from "./AddRecordPage";
import PrivateRoute from "./../components/PrivateRoute";
import { Switch, Route } from "react-router-dom";
import { Home } from "@material-ui/icons";
import { Link } from "react-router-dom";
import RecordListPage from "./RecordListPage";

class Private extends Component {
  render() {
    
    return (
      <div>
        <h1>Private Route</h1>
        <h2>Welcome {this.props.user && this.props.user.email}</h2>
        {/* 
        <h2>Welcome {this.props.user ? this.props.user.username : null }</h2> 
*/}

        <Link to="/records/add">
          <button className="navbar-button">Add Record</button>{" "}
        </Link>
        <br /> 

        {/*<Switch>
         <PrivateRoute
            exact
            path="/records/edit/:id"
            component={UpdateRecordPage}
          />
          <PrivateRoute exact path="/records/add" component={AddRecordPage} />
        </Switch> */}
        <RecordListPage />
      </div>
    );
  }
}

export default withAuth(Private);
