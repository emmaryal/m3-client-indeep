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
              alt="record"
            />
          </Link>
        ) : (
          <Link to={"/"} id="home-btn">
            <img
              className="rotate"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeUxokMH9aY_2qzJ6F6M-rBq7oL56zwA2uWw&usqp=CAU"
              alt="record"
            />
          </Link>
        )}
        <h1 className="indeepTitle">Indeep Records</h1>

        <div className="rightnav">
          {this.props.isLoggedIn ? (
            <>
              <p>
                {this.props.user.profilePic ? (
                  <Link to={"/private"} id="profile-btn">
                    <img
                      style={{ margin: "20px" }}
                      src={this.props.user.profilePic}
                      alt="profile pic"
                      width="50"
                      height="50px"
                    />
                    )
                  </Link>
                ) : (
                  <Link to={"/private"} id="profile-btn">
                    <img
                      style={{ margin: "20px" }}
                      src={this.state.profilePlaceholder}
                      alt="profile pic"
                      width="60px"
                      height="60px"
                    />
                  </Link>
                )}
              </p>

              <button className="btn-2 mb2" onClick={this.props.logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="btn-2 mb2">Login</button>
                {/* {" "} */}
              </Link>
              <br />
              <Link to="/signup">
                <button className="btn-2 mb2">Sign Up</button>
                {/* {" "} */}
              </Link>
            </>
          )}
        </div>
      </nav>
    );
  }
}

export default withAuth(Navbar);
