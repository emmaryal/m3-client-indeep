//import { EmailTwoTone} from "@material-ui/icons";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from './../context/auth-context';
import axios from "axios"
import { Form } from "react-bootstrap";
const validEmailRegex = 
  //RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
  RegExp(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i);

  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      // if we have an error string set valid to false
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
  }

  class Signup extends Component {
  state = { email: "",name: "", password: "", profilePic: "",  errors: {
    email: '',
    name: '',
    password: '',
  } };

  handleFormSubmit = event => {
    event.preventDefault();
    const { email, name, password, profilePic } = this.state;
    this.props.signup( email, name, password, profilePic );

    if(validateForm(this.state.errors)) {
      console.info('Valid Form')
    }else{
      console.error('Invalid Form')
    }

  };




  handleChange = event => {
    const { name, value } = event.target;
    //this.setState({ [name]: value });
    
    let errors = this.state.errors;

    switch (name) {
      case 'fullName': 
        errors.fullName = 
          value.length < 5
            ? 'Name must be 5 characters long!'
            : '';
        break;
      case 'email': 
        errors.email = 
          validEmailRegex.test(value)
            ? ''
            : 'Email is not valid!';
        break;
      case 'password': 
        errors.password = 
          value.length < 8
            ? 'Password must be 8 characters long!'
            : '';
        break;
      default:
        break;
    }


    this.setState({errors, [name]: value}, ()=> {
      console.log(errors)
  })
  };


  handleFileUpload = (e) => {
    console.log("The file to be uploaded is: ", e.target.files);
    const file = e.target.files[0];
    const uploadData = new FormData();
    // image => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new project in '/api/projects' POST route
    uploadData.append("profilePic", file);
    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/upload`, uploadData, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("response is: ", response);
        // after the console.log we can see that response carries 'secure_url' which we can use to update the state
        this.setState({ profilePic: response.data.secure_url });
      })
      .catch((err) => {
        console.log("Error while uploading the file: ", err);
      });
  };
  render() {
    const { email, name, password, profilePic, errors } = this.state;
    
    return (
      <div>
        <h1>Sign Up</h1>
        
        <Form onSubmit={this.handleFormSubmit}>
        <Form.Group controlId="exampleForm.ControlInput1">
         
          <label>Email:</label>
          <Form.Control type="text" name="email" value={email} onChange={this.handleChange} id="exampleInputEmail1" className="form-control" aria-describedby="emailHelp" />
          {errors.email.length > 0 && 
  <span className='error'>{errors.email}</span>}
  <br />
          
          <label>Name:</label>
          <Form.Control type="text" name="name" value={name} onChange={this.handleChange} id="exampleInputName1" className="form-control" aria-describedby="nameHelp" />
          {errors.name.length > 0 && 
  <span className='error'>{errors.name}</span>}
  <br />
          <label>Password:</label>
          <Form.Control type="password" name="password" value={password} onChange={this.handleChange} id="exampleInputPassword1" className="form-control" aria-describedby="passwordHelp" />
          {errors.password.length > 0 && 
  <span className='error'>{errors.password}</span>}
  <br />
          <label>Profile Image</label>
          <Form.Control
            name="profilePic"
            type="file"
            onChange={this.handleFileUpload}
          />
          <span>
            <img
              style={{ width: "100px" }}
              src={profilePic && profilePic}
              alt=""
            ></img>
          </span>
          </Form.Group>
          <input variant = "secondary" type="submit" value="Signup" />
        </Form>
        
        <p>Already have account?</p>
        <Link to={"/login"}> Login</Link>
      </div>
    );
  }
}



export default withAuth(Signup);


// const EnhancedSignup = withAuth(Signup)
// export default EnhancedSignup;