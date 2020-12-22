import axios from "axios";
import jwt_decode from "jwt-decode";

export const register = newUser => {
  return axios
    .post("http://localhost:8000/users/register", {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      password: newUser.password
    })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log(err);
    });
};

export const login = user => {
  return axios
    .post("http://localhost:8000/users/login", {
      email: user.email,
      password: user.password
    })
    .then(response => {
      localStorage.setItem("usertoken", response.data.token);
      return response.data;
    })
    .catch(err => {
      console.log(err);
    });
};

export const addCardio = workout => {
  const theToken = localStorage.getItem("usertoken");
  const decodedToken = jwt_decode(theToken);

  const email = decodedToken.identity.email;

  return axios
    .post("http://localhost:8000/add_cardio:" + email, {
      user_cardio: workout
    })
    .then(response => {
      return response;
    })
    .catch(err => {
      console.log(err);
    });
};

export const addStrength = workout => {
    const theToken = localStorage.getItem("usertoken");
    const decodedToken = jwt_decode(theToken);
  
    const email = decodedToken.identity.email;
  
    return axios
      .post("http://localhost:8000/add_workout:" + email, {
        user_workouts: workout
      })
      .then(response => {
        return response;
      })
      .catch(err => {
        console.log(err);
      });
  };

  export const emailWorkout = (email, title, body) => {
    fetch('http://localhost:4000/mail', {
        method: "POST",
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, title: title, body: body})
    }).catch(error => console.log(error))
}

