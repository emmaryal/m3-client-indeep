import React, { Component } from "react";
import { withAuth } from "./../context/auth-context";
import UpdateRecordPage from "./UpdateRecordPage";
import AddRecordPage from "./AddRecordPage";
import PrivateRoute from "./../components/PrivateRoute";
import { Switch, Route } from "react-router-dom";
import { Home } from "@material-ui/icons";
import { Link } from "react-router-dom";
import RecordListPage from "./RecordListPage";
import authService from "../lib/auth-service";

class Private extends Component {
  state= {currentUser:null}
  
  componentDidMount() {
  
    this.getCurrentUser();
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
  
  render() {
    
    return (
      <div>
       
        {/* 
        <h2>Welcome {this.props.user ? this.props.user.username : null }</h2> 
*/}
{(this.state.currentUser === "admin")
?
(<Link to="/records/add">
 <button className="navbar-button">Add Record</button>{" "}
 </Link>)
 :  
 <div>
 <h4>Welcome {this.props.user && this.props.user.email}</h4>
<p> here we will have shopping cart stuff and links to faves</p>
 </div>
}

       
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
