import React, { Component } from "react";
import { signup } from "../../server/api";
import { Link, withRouter } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import LoginView from "../login/LoginView";
import { Message, Button, Segment } from "semantic-ui-react";

export default class SignUpView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmittedSuccess: false
    };
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleSignUp(email, password, firstName, lastName) {
    const signupPromise = signup(email, password, firstName, lastName);
    var signupSuccess = false;
    signupPromise.then(response => {
      console.log("signup response: ");
      console.log(response);
      signupSuccess = response.success;
      if (signupSuccess) {
        alert("successfully signed up");
      } else {
        alert("email already taken, please try a different email");
      }
      this.setState({ isSubmittedSuccess: signupSuccess });
    });
  }

  render() {
    return this.state.isSubmittedSuccess ? (
      <Segment>
        <Message floating size="massive">
          Sign Up Successful!
        </Message>
        <Link to={"/"}>
          <Button color="red"> Take me back! </Button>
        </Link>
      </Segment>
    ) : (
      <SignUpForm handleSubmit={this.handleSignUp} />
    );
  }
}
