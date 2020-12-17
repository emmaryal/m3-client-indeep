import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "./../context/auth-context";

class Navbar extends Component {
  state = {
    profilePlaceholder: "https://image.flaticon.com/icons/png/512/64/64572.png",
  };

  render() {
    // const { user, logout, isLoggedin } = this.props;
    return (
      <nav className="navbar">
        {this.props.isLoggedIn ? (
          <Link to={"/"} id="home-btn">
            <img
              className="rotate"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeUxokMH9aY_2qzJ6F6M-rBq7oL56zwA2uWw&usqp=CAU"
            alt="record"/>
          </Link>
        ) : (
          <Link to={"/"} id="home-btn">
            <img className="rotate" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeUxokMH9aY_2qzJ6F6M-rBq7oL56zwA2uWw&usqp=CAU" alt="record" />
            </Link>
        )}
        <h1 className="indeepTitle">Indeep Records</h1>



        
        <div className="rightnav">
          {this.props.isLoggedIn ? (
            <>
              {/* <p>logged in as: {this.props.user && this.props.user.email}</p> */}
              <p>
              
                {this.props.user.profilePic ? (
                  <Link to={"/private"} id="profile-btn">
                  <img style={{margin: "20px"}}
                    src={this.props.user.profilePic}
                    alt="profile pic"
                    width="50"
                    height="60"
                  />)
                  </Link>
                ): (
                  <Link to={"/private"} id="profile-btn">
                  <img style={{margin: "20px"}}
                    src={this.state.profilePlaceholder}
                    alt="profile pic"
                    width="50"
                    height="60"
                    
                  />
                  </Link>
                )}
              </p>

              <button onClick={this.props.logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="navbar-button">Login</button>{/* {" "} */}
              </Link>
              <br />
              <Link to="/signup">
                <button className="navbar-button">Sign Up</button>{/* {" "} */}
              </Link>
            </>
          )}
        </div>
      </nav>
    );
  }
}

export default withAuth(Navbar);
