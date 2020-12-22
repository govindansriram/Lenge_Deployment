import React, { Component } from "react";
import { register } from "../../components/UserFunctions";
import NavBar from "../../components/navbar/navbar";
import { Link } from "react-router-dom";

import "./SignUp.css";

import signupPic from "./signup.JPG";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      first_name: "",
      last_name: "",
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

    const newUser = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password
    };

    register(newUser).then(res => {
      if (!res.result.error) {
        this.props.history.push("/logIn");
      } else {
        alert("An account with that email already exists!");
      }
    });
  }

  validateForm() {
    return (
      this.state.first_name.length > 0 &&
      this.state.last_name.length > 0 &&
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.email.includes("@")
    );
  }

  render() {
    return (
      <div className="signup-page">
        <NavBar></NavBar>
        <header className="signup-header">
          <img className="signup-image" src={signupPic} alt="signup-img"></img>
        </header>
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="first_name">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="first_name"
                  placeholder="Enter First Name"
                  value={this.state.first_name}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="last_name">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="last_name"
                  placeholder="Enter Last Name"
                  value={this.state.last_name}
                  onChange={this.onChange}
                />
              </div>
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
                Sign Up
              </button>
            </form>
            <Link to="/logIn">Already have an account? Log in!</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
