import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Private from "./pages/Private";
import RecordDetails from "./components/RecordDetails";
import AddRecordPage from "./pages/AddRecordPage";
import UpdateRecordPage from "./pages/UpdateRecordPage";
import AnonRoute from "./components/AnonRoute";
import PrivateRoute from "./components/PrivateRoute";
import Footer from "./components/Footer";

class App extends Component {
  render() {
    return (
      <div className="container">
        <Navbar />

        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRoute exact path="/records/add" component={AddRecordPage} />
          <Route exact path="/records/:id" component={RecordDetails} />
          <AnonRoute exact path="/signup" component={Signup} />
          <AnonRoute exact path="/login" component={Login} />
          <PrivateRoute exact path="/private" component={Private} />
          <PrivateRoute
            exact
            path="/records/edit/:id"
            component={UpdateRecordPage}
          />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
