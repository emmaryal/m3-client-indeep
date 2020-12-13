import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { withAuth } from "./../context/auth-context";

class Navbar extends Component {
  state = { profilePlaceholder: "./../images/profilePlaceholder.jpg" };

  render() {
    // const { user, logout, isLoggedin } = this.props;
    return (
      <nav className="navbar">
        {this.props.isLoggedIn ? (
          <Link to={"/private"} id="home-btn">
            <h4>Home</h4>
            <img src = "./../images/logo.PNG" />
          </Link>
        ) : (
          <Link to={"/"} id="home-btn">
            <h4>Home</h4>
          </Link>
        )}

        <div className="rightnav">
          {this.props.isLoggedIn ? (
            <>
              <p>logged in as: {this.props.user && this.props.user.email}</p>
              <p>
                {this.props.user.profilePic ? (
                  <img
                    src={this.props.user.profilePic}
                    alt="profile pic"
                    width="50"
                    height="60"
                  />
                ) : (
                  <img
                    src={this.state.profilePlaceholder}
                    alt="profile pic"
                    width="50"
                    height="60"
                  />
                )}
              </p>

              <button onClick={this.props.logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="navbar-button">Login</button>{" "}
              </Link>
              <br />
              <Link to="/signup">
                <button className="navbar-button">Sign Up</button>{" "}
              </Link>
            </>
          )}
        </div>
      </nav>
    );
  }
}

export default withAuth(Navbar);
