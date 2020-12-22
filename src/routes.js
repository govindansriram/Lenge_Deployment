import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/home/Home";
import SignUp from "./pages/signUp/SignUp";
import LogIn from "./pages/login/LogIn";
import App from "./App";
export default function Routes(props) {
  //Add new routes in this array
  const routes = [
    {
      path: "/",
      component: Home
    },
    {
      path: "/strengthworkouts",
      component: App
    },
    {
      path: "/cardioworkouts",
      component: App
    },
    {
      path: "/signUp",
      component: SignUp
    },
    {
      path: "/logIn",
      component: LogIn
    },
    {
      path: "/profile",
      component: App
    }
  ];
  return (
    <Router>
      <Switch>
        {routes.map((route, index) => {
          return (
            <Route
              exact
              key={index}
              path={route.path}
              component={route.component}
            />
          );
        })}
      </Switch>
    </Router>
  );
}
