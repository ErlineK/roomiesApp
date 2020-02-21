import React, { Component } from "react";
import "./auth.scss";

class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      password_confirm: "",
      registrartionErrs: ""
    };

    this.doSubmit = this.doSubmit.bind(this);
    this.doOnChange = this.doOnChange.bind(this);
  }

  doSubmit(event) {
    //This will handle the form data
    console.log("register form submit");
    //TODO: validate fields
    // call to register WS goes here
    event.preventDefault();
  }

  //saves the state of form data
  doOnChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <div className="from-container">
        <form onSubmit={this.doSubmit}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            className="form-control"
            value={this.state.email}
            onChange={this.doOnChange}
            required
          />
          <label htmlFor="pass">Password</label>
          <input
            id="pass"
            type="password"
            name="password"
            placeholder="Password"
            className="form-control"
            value={this.state.password}
            onChange={this.doOnChange}
            required
          />
          <input
            type="password"
            name="password_confirm"
            placeholder="Confirm Password"
            className="form-control input-margin"
            value={this.state.password_confirm}
            onChange={this.doOnChange}
            required
          />
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    );
  }
}

export default Registration;
