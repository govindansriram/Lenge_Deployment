import React from "react";
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";

import { useHistory } from "react-router-dom";

import "./CardioCard.css";

import { addCardio } from "../../components/UserFunctions";

import { emailWorkout } from "../../components/UserFunctions";

import jwt_decode from "jwt-decode";

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const clickCardioCard = (props, history) => {
  const token = localStorage.getItem("usertoken");
  const decodedToken = jwt_decode(token);

  const inspiration = [
    "We are what we repeatedly do. Excellence then is not an act but a habit. ~ Aristotle",
    "The difference between the impossible and the possiible lies in a person's determination. ~ Tommy Lasorda",
    "To give anything less than your best is to sacrifice the gift. ~ Steve Prefontaine",
    "Nothing will work unless you do. ~ Maya Angelou",
    "Strength does not come from physical capacity. It comes from an indomitable will. ~ Mahatma Gandhi",
    "Don't count the days. Make the days count. ~ Muhammad Ali",
    "Do what you have to do until you can do what you want to do. ~ Oprah Winfrey",
    "It's going to be a journey. It's not a sprint to get in shape. ~ Kerri Walsh Jennings",
    "We cannot start over. But we can begin now and make a new ending. ~ Zig Ziglar",
    "No matter how many mistakes you make or how slow you progress, you are still way ahead of everyone who isn't trying. ~ Tony Robbins"
  ];

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;

  const email = decodedToken.identity.email;
  const title = "Your Cardio Workout";
  const body =
    "Thank you for using Lenge Fitness! \n" +
    "\nCardio Workout " +
    today +
    "\n    Circuit Sets: " +
    props.Circuit_sets +
    "\n    Exercise 1: " +
    props.Exercise_One +
    "\n    Exercise 2: " +
    props.Exercise_Two +
    "\n    Exercise 3: " +
    props.Exercise_Three +
    "\n\nDaily Motivation \n" +
    inspiration[randomInteger(0, 9)];

  console.log(props);
  addCardio(props).then(res => {
    if (res.data === "Added cardio") {
      history.push("/profile");
      alert("An email of your workout has been sent!");
    } else {
      console.log(res.data);
    }
  });

  emailWorkout(email, title, body);
};

export const CardioCard = props => {
  const history = useHistory();
  return (
    <div className="card-wrapper">
      <Card>
        <CardBody>
          <CardTitle className="card-text-diff">
            {props.workout.Exercise_One}
          </CardTitle>
          <CardTitle className="card-text-diff">
            {props.workout.Exercise_Two}
          </CardTitle>
          <CardTitle className="card-text-diff">
            {props.workout.Exercise_Three}
          </CardTitle>
          <hr />
          <CardText className="card-text-exercises">
            Sets: {props.workout.Circuit_sets}
          </CardText>
        </CardBody>
        <Button
          className="add-button"
          style={{display: props.displayButton}}
          onClick={() => clickCardioCard(props.workout, history)}
        >
          Add to Workouts
        </Button>
      </Card>
    </div>
  );
};

export default CardioCard;
