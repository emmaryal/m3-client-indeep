import React, { Component } from "react";
import { Link } from "react-router-dom";
import recordService from "./../lib/records-service";
import authService from "./../lib/auth-service";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import ReactPayPal from "./ReactPaypal";

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
    count: 0,
    currentUser: null,
    isFavourite: false,
    checkout: true,
    setCheckout: true,
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
    console.log("record id:", id);
    recordService
      .getOne(id)
      .then((data) => {
        console.log("data from getsinglerecord", data);
        //const theRecord = {data}
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
        });
      })

      .catch((err) => console.log(err));
  };

  addFavourite = () => {
    /* this.state.isFavourite
      ? (this.setState({ isFavourite: false}))
     
      : this.setState({ isFavourite: true }); */
    this.setState({ isFavourite: !this.state.isFavourite });
    const userId = this.state.currentUser;
    const { id } = this.props.match.params;
    const recordId = id;
    console.log("isFavourite:", this.state.isFavourite);
    console.log("record id:", id);
    console.log("userid:", userId);

    if (this.state.isFavourite === false) {
      recordService
        .updateFave(userId, recordId)
        .then()
        .catch((error) => console.log(error));
    } else {
      recordService
        .removeFave(recordId, userId)
        .then()
        .catch((error) => console.log(error));
    }
  };

  setPopularity = (id) => {
    //get
  };

  setCheckout = () => {};
  render() {
    /* const onSuccess = (payment) => console.log("Successful payment!", payment);
    const onError = (error) =>
      console.log("Erroneous payment OR failed to load script!", error);
    const onCancel = (data) => console.log("Cancelled payment!", data); */

    return (
      <Container className="card">
        <Row>
          <Col className="details-labels" lg={6}>
            <h3>{this.state.title}</h3>
            <h4>{this.state.artist}</h4>
            <p className="details-labels">label: {this.state.label}</p>
            <p>format: {this.state.format}</p>
            <p>label: {this.state.label}</p>
            <p>media condition: {this.state.mediaCondition}</p>
            <p>sleeve condition: {this.state.sleeveCondition}</p>
            <p>weight: {this.state.weight}g</p>
            <p>catalogue no.: {this.state.catno}</p>
            <p>comments: {this.state.comments}</p>
            <div>price: {this.state.price}€</div>
            <br />
            <Link to={"/"}>see all</Link>
          </Col>
          <Col md={3}>
            <img
              style={{ width: "200px" }}
              src="https://www.saga.co.uk/contentlibrary/saga/publishing/verticals/money/personal-finance/making-money/selling-vinyl-shutterstock-234267241.jpg"
              alt="record"
            />
            <img
              style={{ width: "200px" }}
              src="https://www.saga.co.uk/contentlibrary/saga/publishing/verticals/money/personal-finance/making-money/selling-vinyl-shutterstock-234267241.jpg"
              alt="record"
            />
            <br />

            {this.state.isFavourite ? (
              <button onClick={this.addFavourite}>
                Remove from favourites
              </button>
            ) : (
              <button onClick={this.addFavourite}>Add to favourites</button>
            )}
          </Col>
          <Col sm={3}>
            {this.state.checkout === true ? (
              <div className="payment-div">
                <ReactPayPal toPay={this.state.price} />
              </div>
            ) : (
              <div>
                <h1>React-PayPal</h1>
                <button
                  onClick={() => {
                    this.setCheckout(true);
                  }}
                  className="checkout-button"
                >
                  Checkout
                </button>
              </div>
            )}

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
          </Col>
        </Row>
      </Container>
    );
  }
}

export default RecordDetails;
