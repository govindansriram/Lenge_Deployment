import React, { useState, useEffect } from "react";
import NavBar from "../../components/navbar/navbar";
import {
  CardImg,
  Card,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col
} from "reactstrap";
import jwt_decode from "jwt-decode";

import "./Profile.css";

import CardioCard from "../workouts/CardioCard";
import WorkoutCard from "../workouts/WorkoutCard";

import profile from "./profile.JPG";

import { isLoggedIn } from "../../components/Authentication";

export default function Profile() {
  const token = localStorage.getItem("usertoken");
  const decodedToken = jwt_decode(token);

  const name = decodedToken.identity.first_name;
  const lastName = decodedToken.identity.last_name;
  const email = decodedToken.identity.email;

  const [pastCardio, setPastCardio] = useState([]);
  const [pastStrength, setPastStrength] = useState([]);

  useEffect(() => {
    const fetchPost = () => {
      fetch(
        "http://localhost:8000/past_workouts:" + email + "/difficulty:Cardio",
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json"
          }
        }
      ).then(response =>
        response.json().then(data => {
          setPastCardio(data);
        })
      );
    };
    fetchPost();
  }, []);

  useEffect(() => {
    const fetchPost = () => {
      fetch(
        "http://localhost:8000/past_workouts:" + email + "/difficulty:Strength",
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json"
          }
        }
      ).then(response =>
        response.json().then(data => {
          setPastStrength(data);
        })
      );
    };
    fetchPost();
  }, []);

  let cardioCards = null;
  let strengthCards = null;

  if (pastCardio != null) {
    cardioCards = pastCardio.map(workout => {
      return (
        <li className="flex-item">
          <CardioCard workout={workout} displayButton={"none"} />
        </li>
      );
    });
  }

  if (pastStrength != null) {
    strengthCards = pastStrength.map(workout => {
      return (
        <li className="flex-item">
          <WorkoutCard workout={workout} displayButton={"none"} />
        </li>
      );
    });
  }

  var numCardio = 0;
  var numStrength = 0;
  if (cardioCards) {
    numCardio = cardioCards.length;
  }
  if (strengthCards) {
    numStrength = strengthCards.length;
  }

  return (
    <div className="profile">
      <NavBar logged={isLoggedIn()} />
      <header className="profile-header">
        <img className="profile-image" src={profile} alt="profile-img"></img>
      </header>
      <div className="profile-page">
        <Container>
          <Row>
            <Col>
              <Card className="profile-pic-card" style={{ cursor: "default" }}>
                <CardImg
                  className="profilePic-image"
                  src={"https://robohash.org/" + name}
                  alt="profilePic-image"
                />
                <CardBody>
                  <CardTitle> </CardTitle>
                </CardBody>
              </Card>
            </Col>
            <Col className="personal-info">
              <h1 className="personal-info-label">PERSONAL INFORMATION</h1>
              <Row>
                <Col className="name-label">
                  {" "}
                  <h1>NAME</h1>
                </Col>
                <Col className="profile-name">
                  {" "}
                  <h1>
                    {name} {lastName}
                  </h1>
                </Col>
              </Row>
              <Row>
                <Col className="name-label">
                  {" "}
                  <h1>EMAIL</h1>
                </Col>
              </Row>
              <Row>
                <Col className="profile-email">
                  {" "}
                  <h1>{email}</h1>
                </Col>
              </Row>
              <Row>
                <Col className="name-label">
                  {" "}
                  <h1>TOTAL WORKOUTS</h1>
                </Col>
                <Col className="num-workouts">
                  {" "}
                  <h1>{numCardio + numStrength}</h1>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col>
              <h1 className="profile-workouts">My Strength Workouts</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              {strengthCards ? (
                <ul className="flex-container wrap-reversez">
                  {strengthCards}
                </ul>
              ) : (
                console.log("No strength workouts yet!")
              )}
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col>
              <h1 className="profile-workouts">My Cardio Workouts</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              {cardioCards ? (
                <ul className="flex-container wrap-reversez">{cardioCards}</ul>
              ) : (
                console.log("No cardio workouts yet!")
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
