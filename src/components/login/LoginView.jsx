import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import LoginForm from "./LoginForm";
import LoginLogo from "./LoginLogo";
import { login } from "../../server/api";

// view for the login page
export default class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = { loginLoading: false };
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(email, password) {
    this.setState({ loginLoading: true });
    const loginPromise = login(email, password);
    var loginSuccess = false;
    loginPromise.then(response => {
      console.log("Login response");
      console.log(response);
      loginSuccess = response.success;
      let name = response.firstname + " " + response.lastname;
      let profileImage = response.profileimage;

      this.setState({ loginLoading: false });
      if (!loginSuccess) {
        alert("invalid email or password");
      } else {
        // update user session
        this.props.onUserSessionUpdate(email, loginSuccess, name, profileImage);
      }
    });
  }

  render() {
    return (
      <main className="App-container-login">
      <Grid
        textAlign="center"
        style={{ height: "100%"}}
        verticalAlign="middle"
      >
        <Grid.Column width={4}>
        <LoginLogo />

        <LoginForm
          onLogin={this.handleLogin}
          onLoadingLogin={this.state.loginLoading}
        />
        </Grid.Column>
      </Grid>
      </main>
    );
  }
}
