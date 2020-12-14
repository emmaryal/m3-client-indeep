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

        <Form className="forms-input" onSubmit={this.handleFormSubmit}>
        <Form.Group controlId="exampleForm.ControlInput1">
          <label>Email:</label>
          <Form.Control type="text" name="email" value={email} onChange={this.handleChange} id="exampleInputEmail1" className="form-control" aria-describedby="emailHelp" />

          
          <label>Password:</label>
          <Form.Control type="password" name="password" value={password} id="exampleInputPassword1" onChange={this.handleChange} className="form-control" aria-describedby="passwordHelp"/>
</Form.Group>
          <input variant = "secondary" type="submit" value="Login" />
        </Form>
      </div>
    );
  }
}

export default withAuth(Login);
