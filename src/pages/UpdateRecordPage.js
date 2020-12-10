

import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';

class UpdateRecordPage extends Component {
  state = {
    title: "", 
    artist: ""
  }
  
    
  handleFormSubmit = (event) => {event.preventDefault();
    const { title, artist } = this.state;
    const { id } = this.props.match.params;   
  
    axios.put(
      `http://localhost:5000/api/records/${id}`,
      { title, artist }
    )
    .then( () => {
      this.props.getTheRecord();
        })
     .catch( (err) => console.log(err) )}

  
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value })
     }
  render(){
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          
          <label>Title:</label>
          <input type="text"
            name="title" 
            value={this.state.title} 
            onChange={this.handleChange}/>
          
          <label>Artist:</label>
          <input type="text"
            name="artist" 
            value={this.state.artist} 
            onChange={this.handleChange}/>
          
          <input type="submit" value="Update Record" />
        </form>
      </div>
    )
  }
}

export default withRouter(UpdateRecordPage);
