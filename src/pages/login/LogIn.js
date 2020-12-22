import React, { Component } from "react";
import { login } from "../../components/UserFunctions";
import NavBar from "../../components/navbar/navbar";
import { Link } from 'react-router-dom';

import "./LogIn.css";
import loginPic from "./login.JPG";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    };

    login(user).then(res => {
      if (!res.error && !res.result) {
        this.props.history.push("/profile");
      } else {
        alert("Invalid Information!");
      }
    });
  }
  
  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0 && this.state.email.includes("@");
  }

  render() {
    return (
      <div className="login">
        <NavBar></NavBar>
        <header className="login-header">
          <img className="login-image" src={loginPic} alt="login-img"></img>
        </header>
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter Email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password </label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Enter Password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </div>

              <button
                type="submit"
                disabled={!this.validateForm()}
                className="btn btn-lg btn-primary btn-block"
              >
                Log In
              </button>
            </form>
            <Link to="/signUp">Don't have an account? Sign up!</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
