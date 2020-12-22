import React, { Component } from "react";
import NavBar from "../../components/navbar/navbar";
import { Button, ButtonGroup } from "reactstrap";

import "./CardioWorkouts.css";
import "./StrengthWorkouts.css";

import jwt_decode from "jwt-decode";

import { isLoggedIn } from "../../components/Authentication";

import cardio from "./cardio.JPG";

import CardioCard from "./CardioCard";

class CardioWorkouts extends Component {
  constructor() {
    super();
    this.state = {
      cardioWorkouts: [],
      difficulty: "",
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  changeDifficulty(theDifficulty)
  {

    this.setState({difficulty: theDifficulty});

    const token = localStorage.getItem("usertoken");
    const decodedToken = jwt_decode(token);
    const email = decodedToken.identity.email;

    fetch(
      "http://localhost:8000/cardio:" + email + "/difficulty:" + theDifficulty,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        }
      }
    ).then(response =>
      response.json().then(data => {
        this.setState({cardioWorkouts: data});
      })
    );
  }

  render() {
    let workoutCards = this.state.cardioWorkouts.map(workout => {
      return (
        <li className="flex-item">
          <CardioCard workout={workout} />
        </li>
      );
    });
    return (
      <div className="workouts">
        <NavBar logged={isLoggedIn()} />
        <header className="workouts-header">
          <img className="cardio-image" src={cardio} alt="cardio-img"></img>
          <ButtonGroup>
            <Button onClick={() => this.changeDifficulty("easy")}>Easy</Button>
            <Button onClick={() => this.changeDifficulty("medium")}>Medium</Button>
            <Button onClick={() => this.changeDifficulty("hard")}>Hard</Button>
          </ButtonGroup>
          {this.state.difficulty ? (
            <h1 className="difficulty-label">difficulty: {this.state.difficulty}</h1>
          ) : (
            <h1 className="difficulty-label">select a difficulty</h1>
          )}
          <ul className="flex-container wrap-reversez">{workoutCards}</ul>
        </header>
      </div>
    );
  }
}

export default CardioWorkouts;

