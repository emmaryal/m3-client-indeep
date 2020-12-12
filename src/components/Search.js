import React, { Component } from "react";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"


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
        {/* <input
          className="input search-bar" block
          type="text"
          name="search"
          value={this.state.search}
          placeholder="Search"
          onChange={this.handleInput}
        /> */}
      </Form>
       
       
    /*    <Form.Group controlId="formBasicSearch">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" />
  </Form.Group> */
         );
       }
     }
     
     export default Search;
      {/* <Form inline>
      <FormControl type="text" name = "search" placeholder="Search" className="mr-sm-2" value={this.state.search} onChange={this.handleInput}/>
      <Button variant="outline-success">Search</Button>
    </Form> */}
 
