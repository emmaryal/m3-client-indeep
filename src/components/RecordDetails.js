import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import recordService from "./../lib/records-service";
// is this how we connect me?? /auth/me.....
import authService from "./../lib/auth-service";
import { ControlPointDuplicate } from "@material-ui/icons";


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
  };
  componentDidMount() {
    this.getSingleRecord();
    this.getCurrentSessionUser();  
  }

  getCurrentSessionUser = () => {
    authService
      .me()
      .then((data) => {
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
        console.log("this.state.currentUser:", this.state.currentUser)
        console.log("userId:", _id)
      })
      .catch((err) => console.log(err));
      });}


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
  addFavourite = () =>{
   (this.state.isFavourite)
   ?
   this.setState({isFavourite: false })
   :
   this.setState({isFavourite: true })
   const userId = this.state.currentUser
   const recordId = this.state.recordId
   recordService.updateFave(userId, recordId)
   .then(
        
      )
      .catch((error) => console.log(error));  
   };


  render() {
    return (
      <div>
      
        <h2>title : {this.state.title}</h2>
        {/*(this.state.image === "")?<img style={{ width: "200px" }} src = "./../images/recordPlaceholderImage.jpeg"/>  : <img style={{ width: "200px" }}src = {this.state.image}/>*/}
        <img src={this.state.defaultImg} />
        <h4>artist : {this.state.artist}</h4>
        <p>label: {this.state.label}</p>
        <p>format: {this.state.format}</p>
        <p>label: {this.state.label}</p>
        <p>media condition: {this.state.mediaCondition}</p>
        <p>sleeve condition: {this.state.sleeveCondition}</p>
        <p>weight: {this.state.weight}</p>
        <p>catalogue no.: {this.state.catno}</p>
        <p>price: {this.state.price}€</p>
        {/*<p>favorited by: {this.state.favoritedBy[0].name }</p>*/}
        <button onClick={this.addFavourite}> heartemoji</button>
        <Link
          to={`https://www.discogs.com/sell/item/{${this.state.listingId}}`}
        >
          <button>Buy</button>
        </Link>
      </div>
    );
  }
}

export default RecordDetails;
