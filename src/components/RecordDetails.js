import React, { Component } from "react";
import { Link } from "react-router-dom";
import recordService from "./../lib/records-service";
import authService from "./../lib/auth-service";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { withAuth } from "./../context/auth-context";
import Button from "react-bootstrap/Button";

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
      this.setState({ currentUser: _id });
      recordService
        .getOneUser(_id)
        .then((user) => {
          const { _id } = user;
          this.setState({ currentUser: _id });
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
        const favouritedByIds = favoritedBy
          ? favoritedBy.map((f) => f._id)
          : [];
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
          favouritedByIds,
        });
      })

      .catch((err) => console.log(err));
  };

  toggleFavourite = () => {
    const userId = this.state.currentUser;
    const { id } = this.props.match.params;


    const isUsersFavourite =
      this.state.favoritedBy && this.state.favouritedByIds.includes(userId);

    if (isUsersFavourite) {
      recordService
        .removeFave(id, userId)
        .then(() => {
          this.setState({ isFavourite: false });
        })
        .catch((error) => console.log(error));
    } else {
      recordService
        .updateFave(userId, id)
        .then(() => {
          this.setState({ isFavourite: true });
        })
        .catch((error) => console.log(error));
    }
  };

  render() {
    return (
      <Container className="card ">
        <Row className="forms-input">
          <Col className="details-labels" md={8}>
            <h3>
              <b>{this.state.title}</b>
            </h3>
            <br />
            <h4>
              <b>artist: </b>
              {this.state.artist}
            </h4>
            <br />
            <p>
              <b>label: </b> {this.state.label}
            </p>
            <p>
              <b>format: </b> {this.state.format}
            </p>
            <p>
              <b>label: </b>
              {this.state.label}
            </p>
            <p>
              <b>media condition: </b>
              {this.state.mediaCondition}
            </p>
            <p>
              <b>sleeve condition: </b>
              {this.state.sleeveCondition}
            </p>
            <p>
              <b>weight: </b>
              {this.state.weight}g
            </p>
            <p>
              <b>catalogue no.: </b>
              {this.state.catno}
            </p>
            <p>
              <b>comments: </b>
              {this.state.comments}
            </p>
            <div>
              <b>price: {this.state.price}€</b>
            </div>
            <br />
            <Link to={"/private"}>see all</Link>
          </Col>
          <Col md={4}>
            <img
              style={{ width: "200px" }}
              src="https://www.saga.co.uk/contentlibrary/saga/publishing/verticals/money/personal-finance/making-money/selling-vinyl-shutterstock-234267241.jpg"
              alt="record"
            />

            {this.state.isFavourite ? (
             
              <Button
         className="btn-2 mb-2"
          variant="outline secondary"
          onClick={this.toggleFavourite}
        >
                Remove from favourites
                </Button>
            ) : (
              <Button
         className="btn-2 mb-2"
          variant="outline secondary"
          onClick={this.toggleFavourite}
        >Add to favourites</Button>
            )}
          </Col>
          
        </Row>
      </Container>
    );
  }
}

export default withAuth(RecordDetails);
