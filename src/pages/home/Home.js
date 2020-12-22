import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import "./Home.css";
import NavBar from "../../components/navbar/navbar";
import { Link } from "react-router-dom";

import { isLoggedIn } from "../../components/Authentication";

import home from "./home.JPG";
import sri from "./sri.JPG";
import run from "./run.jpg";
import squat from "./squat.jpg";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.initTheme();
  }

  initTheme() {
    let theme = JSON.parse(localStorage.getItem("theme"));
    theme && this.setState({ theme: theme });
  }

  render() {
    return (
      <div className="home">
        <NavBar logged={isLoggedIn()} />
        <header className="home-header">
          <img className="home-image" src={home} alt="home-img"></img>
          <div className="banner-text text-center">
            <h1>Let's Lenge!</h1>
            <p className="lead text-center">
              {" "}
              Welcome to Lenge! Make sure you're logged in, and start your daily
              challenge!
            </p>
          </div>
          <div className="daily-challenge-box">
            <h1>Daily Challenge</h1>
            <hr></hr>
            <Button className="sworkouts-button">
              <Link className="strength-workouts" to="/strengthworkouts">
                Strength Workouts
              </Link>
            </Button>
            <Button className="cworkouts-button">
              <Link className="cardio-workouts" to="/cardioworkouts">
                Cardio Workouts
              </Link>
            </Button>
          </div>
          <Container fluid className="pic-container">
            <Row className="pic-row">
              <Col>
                <img className="homepage-pic" src={sri} alt="home-img"></img>
              </Col>
              <Col>
                <img className="homepage-pic" src={run} alt="home-img"></img>
                <h1>For all experience levels!</h1>
              </Col>
              <Col>
                <img className="homepage-pic" src={squat} alt="home-img"></img>
              </Col>
            </Row>
          </Container>
        </header>
      </div>
    );
  }
}
