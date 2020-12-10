import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


class RecordDetails extends Component {
  state = {
    
    title: " ",
    artist: " ",
    price: 0
  };
  componentDidMount() {
    this.getSingleRecord();
  }


  getSingleRecord = () => {
    const { id } = this.props.match.params;
console.log("id:", id)
    axios
      .get(`http://localhost:5000/api/records/${id}`)
      .then((apiResponse) => {
        const theRecord = apiResponse.data;
        const { title, artist, price } = theRecord;
        console.log("theRecord:", theRecord)
        this.setState({ title, artist, price });
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <h1>Record Details</h1>
        <h2>Record title : {this.state.title}</h2>
        <h4>artist : {this.state.artist}</h4>
        <h5>price: {this.state.price}</h5>

        <Link to={`https://www.discogs.com/sell/item/{${this.state.listingId}}`}>
          <button>Buy</button>
        </Link>

       
        
        
            );
          )
        )
      </div>
    );
  }
}

export default RecordDetails;
