import React, { Component } from "react";
import { signup } from "../../server/api";
import { Link } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import { Message, Button, Segment } from "semantic-ui-react";

export default class SignUpView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmittedSuccess: false,
      isSubmittedLoading: false
    };
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleSignUp(email, password, firstName, lastName) {
    this.setState({ isSubmittedLoading: true });
    const signupPromise = signup(email, password, firstName, lastName);
    var signupSuccess = false;
    signupPromise.then(response => {
      console.log("signup response: ");
      console.log(response);
      signupSuccess = response.success;
      this.setState({ isSubmittedLoading: false });
      if (!signupSuccess) {
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
      <SignUpForm
        onSignUpLoading={this.state.isSubmittedLoading}
        onSignUp={this.handleSignUp}
      />
    );
  }
}
