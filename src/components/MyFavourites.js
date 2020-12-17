import React, { Component } from "react";
import recordService from "./../lib/records-service";
import { Link } from "react-router-dom";
export class MyFavourites extends Component {
  state = { userObj: {} };

  componentDidMount() {
    this.getFavourites();
  }

  getFavourites = () => {
    const currentUser = this.props.currentUser;

    recordService
      .getOneUser(currentUser)

      .then((user) => {
        this.setState({ userObj: user });
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <p className="chart-text-title">{this.state.userObj.name}'s favourite records: </p>
        {this.state.userObj.favouriteRecords ? (
          this.state.userObj.favouriteRecords.map((fav) => (
            <div key={fav._id} className="fave-card" style={{ width: "30%" }}>
              <Link to={`/records/${fav._id}`}>
                <p className="chart-text">{fav.title}</p>
              </Link>
              <p>
                <b>Artist: </b> {fav.artist}
              </p>
              <p>
                <b>Label: </b>
                {fav.label}
              </p>
              <p>
                <b>Price: </b>
                {fav.price}€
              </p>
            </div>
          ))
        ) : (
          <p>Hey {this.state.userObj.name}, you haven't any favourite records yet, why don't you check out our new releases?</p>
        )}
      </div>
    );
  }
}

export default MyFavourites;
