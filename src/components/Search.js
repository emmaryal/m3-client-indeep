import React, { Component } from "react";
import Form from "react-bootstrap/Form"



class Search extends Component {
  state = { search: "" };

  handleInput = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
    this.props.filterRecords(value);
  };
  render() {
    return (
      <Form>
      <Form.Group controlId="formBasicSearch">

      <Form.Control type ="text" name="search" value={this.state.search}
          placeholder="Search"
          onChange={this.handleInput}
        />
        </Form.Group>
       
      </Form>
       
       
    
         );
       }
     }
     
     export default Search;
      