import React, { Component} from "react";
import recordService from "./../lib/records-service"
import { Link } from "react-router-dom";
export class MyFavourites extends Component {
  state = {userObj:{}};

  componentDidMount() {
    this.getFavourites();
  }

  getFavourites = () => {
const currentUser = this.props.currentUser
console.log("currentUser in getFavourites fn:", currentUser)

    recordService
      .getOneUser(currentUser)

      .then((user) => {
       
        this.setState({ userObj:user });
        console.log("this.state in fn:", this.state)
      })
      .catch((err) => console.log(err));
  };


  render() {
    return (
      <div>
       
        {console.log("this.state in render",this.state.userObj.email)}
       
        {this.state.userObj.favouriteRecords ? (
          <p>
            
            your favourite records:
          
            {this.state.userObj.favouriteRecords.map((fav) => (
              <div key={fav._id}className="card" style={{"width": "40%"}}>
              <Link to={`/records/${fav._id}`}>
                <p>{fav.title}</p>
                </Link>
                <p>{fav._id}</p>
                <p>{fav.artist}</p>
                <p>{fav.label}</p>
                <p>{fav.price}€</p>
              </div>
            ))}
          </p>
        ) : (
          <p>suggestions for you: put a random record</p>
        )} 
      </div>
    );
  }
}

export default MyFavourites;
