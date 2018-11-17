import React, { Component } from "react";
import { Button, Grid, Segment, Form } from "semantic-ui-react";
import LoginForm from "./LoginForm";
import LoginLogo from "./LoginLogo";
import { login } from "../../server/api";

// view for the login page
export default class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(email, password) {
    const loginPromise = login(email, password);
    var loginSuccess = false;
    loginPromise.then(response => {
      console.log("login response: ");
      console.log(response);
      loginSuccess = response.success;
      if (!loginSuccess) {
        alert("invalid email or password");
      }
      this.setState({ isAuthenticated: loginSuccess });
      console.log("authenticated: " + this.state.isAuthenticated);
    });
  }

  render() {
    return (
      <Grid
        textAlign="center"
        style={{ height: "100%" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 800 }} />
        <LoginLogo />
        <LoginForm onLogin={this.handleLogin} />
      </Grid>
    );
  }
}
