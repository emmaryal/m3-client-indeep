import React, { Component } from "react";
import { Link } from "react-router-dom";
import recordService from "./../lib/records-service";
import authService from "./../lib/auth-service";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { withAuth } from './../context/auth-context';

const stripePromise = loadStripe(
  "pk_test_51HykoTFq2ycg13FNvuYLaF0ahXb5GLoqRe2KTQSQsWbCRzdSPw9NBIIUclD8i3EvDSG3e7kqU5IwdBSI8bXhXeg800d9VLE2v4"
);

class RecordDetails extends Component {
  state = {
    id: "",
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
    comments: "",
    price: 0,
    defaultImg: "./../images/recordPlaceholderImage.jpeg",
    favoritedBy: [],
    favouritedByIds: [],
    count: 0,
    currentUser: null,
    isFavourite: false,
  };

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

    recordService
      .getOne(id)
      .then((data) => {
        const {
          id,
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
          comments,
          price,
          favoritedBy,
        } = data;

        const userId = this.props.user._id;
        const favouritedByIds = favoritedBy ? favoritedBy.map((f)=> f._id) : [];
        const isFavourite = favoritedBy && favouritedByIds.includes(userId);

        this.setState({
          id,
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
          comments,
          price,
          favoritedBy,
          isFavourite,
          favouritedByIds
        });
      })

      .catch((err) => console.log(err));
  };


  toggleFavourite = () => {
    const userId = this.state.currentUser;
    const { id } = this.props.match.params;
    console.log("favouritedby:", this.state.favoritedBy);
    console.log("isFavourite:", this.state.isFavourite);
    console.log("record id:", id);
    console.log("userid:", userId);


    const isUsersFavourite = this.state.favoritedBy && this.state.favouritedByIds.includes(userId);


    if (isUsersFavourite) {
      recordService
       .removeFave(id, userId)
       .then(() => {
        this.setState({ isFavourite: false });
       })
       .catch((error) => console.log(error))
      } 
      else {        
        recordService.updateFave(userId, id)
          .then(() => {
            this.setState({ isFavourite: true });
          })
          .catch((error) => console.log(error))  
      }
    
  };

  setPopularity = (id) => {
    //get
  };


handleClick = async (event) => {
    // Get Stripe.js instance
    const stripe = await stripePromise;

    // Call your backend to create the Checkout Session
    const response = await fetch('/create-checkout-session', { method: 'POST' });

    const session = await response.json();

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  };


  render() {
    return (
      <Container className="card ">
        <Row className="forms-input">
          <Col className="details-labels" lg={6}>
            <h3><b>{this.state.title}</b></h3>
            <br />
            <h4><b>artist: </b>{this.state.artist}</h4>
            <br />
            <p><b>label: </b> {this.state.label}</p>
            <p><b>format: </b> {this.state.format}</p>
            <p><b>label: </b>{this.state.label}</p>
            <p><b>media condition: </b>{this.state.mediaCondition}</p>
            <p><b>sleeve condition: </b>{this.state.sleeveCondition}</p>
            <p><b>weight: </b>{this.state.weight}g</p>
            <p><b>catalogue no.: </b>{this.state.catno}</p>
            <p><b>comments: </b>{this.state.comments}</p>
            <div><b>price: {this.state.price}€</b></div>
            <br />
            <Link to={"/"}>see all</Link>
          </Col>
          <Col md={3}>
            <img
              style={{ width: "200px" }}
              src="https://www.saga.co.uk/contentlibrary/saga/publishing/verticals/money/personal-finance/making-money/selling-vinyl-shutterstock-234267241.jpg"
              alt="record"
            />
          

{/*             {(this.state.favoritedBy!== null)&&(this.state.favoritedBy.includes(this.state.currentUser)) ?(
              <button onClick={this.toggleFavourite}>
                Remove from favourites
              </button>
            ) : (
              <button onClick={this.toggleFavourite}>Add to favourites</button>
            )} */}

            {(this.state.isFavourite) ?(
              <button onClick={this.toggleFavourite}>
                Remove from favourites
              </button>
            ) : (
              <button onClick={this.toggleFavourite}>Add to favourites</button>
            )}

          </Col>
          <Col sm={3}>
            <div className="App">
              <div className="product">
                <div>
                  <Elements stripe={stripePromise}>
                    <CheckoutForm
                      recordTitle={this.state.title}
                      recordPrice={this.state.price}
                    />
                  </Elements>
                </div>
                 {/* <div>
                 <button role="link" onClick={this.handleClick}>Checkout</button>
                </div> */}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withAuth(RecordDetails);
