import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import recordService from "./../lib/records-service";
// is this how we connect me?? /auth/me.....
import authService from "./../lib/auth-service";
import { ControlPointDuplicate } from "@material-ui/icons";
import ReactBootstrap from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
//import { PayPalButton } from "react-paypal-button-v2";
//import PayPalButton from "./PayPalButton";
//import ReactPayPal from "./ReactPaypal";
import ReactPayPal from "./ReactPaypal"
/* const CLIENT = {
  sandbox: "xxxXXX",
  production: "xxxXXX",
};
const ENV = process.env.NODE_ENV === "production" ? "production" : "sandbox"; */
class RecordDetails extends Component {
  state = {
    recordId: "",
    listingId: "",
    title: " ",
    artist: " ",
    format: "",
    image: "",
    label: "",
    mediaCondition: "",
    sleeveCondition: "",
    weight: "",
    catno: "",
    price: 0,
    defaultImg: "./../images/recordPlaceholderImage.jpeg",
    favoritedBy: [],
    count: 0,
    currentUser: null,
    isFavourite: false,
    checkout: true,
    setCheckout: true
    /* showPaypal: false, */
  };

  /* showPaypalButtons = () => {
    this.setState({ showPaypal: true });
  }; */
  componentDidMount() {
    this.getSingleRecord();
    this.getCurrentSessionUser();
  }

  getCurrentSessionUser = () => {
    authService.me().then((data) => {
      const { _id } = data;
      console.log("id of current session user", _id);
      console.log("data from promise:", data);
      this.setState({ currentUser: _id });
      console.log("this.state:", this.state);
      recordService
        .getOneUser(_id)
        .then((user) => {
          console.log("currentUser from DB: ", user);
          const { _id } = user;
          this.setState({ currentUser: _id });
          console.log("this.state.currentUser:", this.state.currentUser);
          console.log("userId:", _id);
        })
        .catch((err) => console.log(err));
    });
  };

  getSingleRecord = () => {
    const { id } = this.props.match.params;
    console.log("id:", id);
    recordService
      .getOne(id)
      .then((data) => {
        console.log(data);
        //const theRecord = {data}
        const {
          listingId,
          title,
          artist,
          format,
          image,
          label,
          mediaCondition,
          sleeveCondition,
          weight,
          catno,
          price,
          favoritedBy,
        } = data;

        this.setState({
          listingId,
          title,
          artist,
          format,
          image,
          label,
          mediaCondition,
          sleeveCondition,
          weight,
          catno,
          price,
          favoritedBy,
        });
      })

      .catch((err) => console.log(err));
  };

  /*
privRouter.post("/createtip", isLoggedIn, (req, res, next) => {
  // Destructure the values coming from the POST form
  const { title, description, text } = req.body;
  const userId = req.session.currentUser._id;
  console.log("session id to add to createdby field:", userId);
  Tips.create({ title, description, text, userId: userId })
    .then((tip) => {
      const pr = User.findByIdAndUpdate(
        userId,
        { $push: { createdTips: tip._id } },
        { new: true }
      );
      return pr;
    })
    .then((updatedUser) => {
      res.redirect(`/private/myprofile/`);
    })
    .catch((error) => console.log(error));
 */
  addFavourite = () => {
    this.state.isFavourite
      ? this.setState({ isFavourite: false })
      : this.setState({ isFavourite: true });
    const userId = this.state.currentUser;
    const recordId = this.state.recordId;
    recordService
      .updateFave(userId, recordId)
      .then()
      .catch((error) => console.log(error));
  };
setCheckout= () =>{}
  render() {
    /* const onSuccess = (payment) => console.log("Successful payment!", payment);
    const onError = (error) =>
      console.log("Erroneous payment OR failed to load script!", error);
    const onCancel = (data) => console.log("Cancelled payment!", data); */
   
    return (
      <Container>
        <Row>
          <Col lg>
            <h2>{this.state.title}</h2>
            {/*(this.state.image === "")?<img style={{ width: "200px" }} src = "./../images/recordPlaceholderImage.jpeg"/>  : <img style={{ width: "200px" }}src = {this.state.image}/>*/}
            <h4>{this.state.artist}</h4>
            <p>label: {this.state.label}</p>
            <p>format: {this.state.format}</p>
            <p>label: {this.state.label}</p>
            <p>media condition: {this.state.mediaCondition}</p>
            <p>sleeve condition: {this.state.sleeveCondition}</p>
            <p>weight: {this.state.weight}g</p>
            <p>catalogue no.: {this.state.catno}</p>
          </Col>
          <Col>
            <img src="./../images/recordPlaceholderImage.jpeg" />

            <p>price: {this.state.price}€</p>
            {/*<p>favorited by: {this.state.favoritedBy[0].name }</p>*/}
            <button onClick={this.addFavourite}> heartemoji</button>
          </Col>
        </Row>
        {(this.state.checkout === true) 
          ? <div className="payment-div">
          <ReactPayPal toPay={this.state.price}/>
          </div> 

          :<div>
            <h1>React-PayPal</h1>
            <button onClick={() => {this.setCheckout(true)}} className="checkout-button">Checkout</button>
          </div>
        }
            
          

          
        {/* <PayPalButton
          client={CLIENT}
          env={ENV}
          commit={true}
          currency={"EUR"}
          total={100}
          onSuccess={onSuccess}
          onError={onError}
          onCancel={onCancel}
        /> */}
      </Container>
    );
  }
}

export default RecordDetails;
