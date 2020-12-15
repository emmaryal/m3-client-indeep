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

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./components/CheckoutForm";

const stripePromise = loadStripe("pk_test_51HykoTFq2ycg13FNvuYLaF0ahXb5GLoqRe2KTQSQsWbCRzdSPw9NBIIUclD8i3EvDSG3e7kqU5IwdBSI8bXhXeg800d9VLE2v4");


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
          <PrivateRoute exact path="/records/edit/:id" component={UpdateRecordPage}/>
        </Switch>
      </div>
    );
  }
}

export default App;
