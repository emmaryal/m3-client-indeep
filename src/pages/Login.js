import React, { Component } from "react";
import { Form } from "react-bootstrap";

import { withAuth } from './../context/auth-context';

class Login extends Component {
  state = { email: "", password: "" };

  handleFormSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    // Call funciton coming from AuthProvider ( via withAuth )
    this.props.login(email, password);
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { email, password } = this.state;

    return (
      <div>
        <h1>Login</h1>

        <Form onSubmit={this.handleFormSubmit}>
        <Form.Group controlId="exampleForm.ControlInput1">
          <label>Email:</label>
          <Form.Control type="text" name="email" value={email} onChange={this.handleChange} id="exampleInputEmail1" class="form-control" aria-describedby="emailHelp" />

          
          <label>Password:</label>
          <Form.Control type="password" name="password" value={password} id="exampleInputPassword1" onChange={this.handleChange} class="form-control" aria-describedby="passwordHelp"/>
</Form.Group>
          <input variant = "secondary" type="submit" value="Login" />
        </Form>
      </div>
    );
  }
}
{/*
  
  <Form onSubmit={this.handleFormSubmit}>
        <Form.Group controlId="exampleForm.ControlInput1">
    <Form.Label>Title:</Form.Label>
    <Form.Control type="text" name = "title" value={this.state.title}
            onChange={this.handleChange}/>
  </Form.Group>
        <Form.Group controlId="exampleForm.ControlInput1">
    <Form.Label>Title:</Form.Label>
    <Form.Control type="text" name = "title" value={this.state.title}
            onChange={this.handleChange}/>
  </Form.Group>
  
  
  
  
  
  <form>
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
  </div>
  <div class="form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1">
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form> */}
export default withAuth(Login);
