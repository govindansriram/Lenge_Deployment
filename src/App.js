import React,{Component} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import { PrivateRoute } from "./components/PrivateRoute";
import {isLoggedIn} from "./components/Authentication";

import Login from "./pages/login/LogIn";
import Profile from "./pages/profile/Profile";
import CardioWorkouts from "./pages/workouts/CardioWorkouts";
import StrengthWorkouts from "./pages/workouts/StrengthWorkouts";

export default class App extends Component{
    render(){
      return(
        <Router>
          <div>
            <PrivateRoute exact isloggedin={isLoggedIn()} path="/profile" component={Profile} />
            <PrivateRoute exact isloggedin={isLoggedIn()} path="/strengthworkouts" component={StrengthWorkouts} />
            <PrivateRoute exact isloggedin={isLoggedIn()} path="/cardioworkouts" component={CardioWorkouts} />
            <Route exact path="/logIn" component={Login} />
        </div>
      </Router>
        )
    }
  }