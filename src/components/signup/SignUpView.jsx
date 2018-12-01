import React, { Component } from "react";
import { signup } from "../../server/api";
import { Redirect } from "react-router-dom";
import SignUpForm from "./SignUpForm";

export default class SignUpView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmittedSuccess: false,
      isSubmittedLoading: false
    };
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleSignUp(email, password, firstName, lastName, imageStr) {
    this.setState({ isSubmittedLoading: true });
    const signupPromise = signup(email, password, firstName, lastName, imageStr);
    var signupSuccess = false;
    signupPromise.then(response => {
      console.log("signup response: ");
      console.log(response);
      signupSuccess = response.success;
      this.setState({ isSubmittedLoading: false });
      if (!signupSuccess) {
        this.props.onSystemMessage("Email Already Registered, please try again.");
      } else {
        this.props.onSystemMessage("Sign Up Successful");
      }
      this.setState({ isSubmittedSuccess: signupSuccess });
      return signupSuccess;
    })
      .then((successfulSignup)=> {
        if (successfulSignup) {
         // update user info in db
        }
      })
      .catch(error => {
        console.log("update user info post error: ");
        console.log(error);
        this.setState({ isSubmittedLoading: false });

      })

    
  }

  render() {
    // go back to login upon successful sign up
    return this.state.isSubmittedSuccess ? (
      <Redirect to={"/"} />
    ) : (
      <SignUpForm
        onSignUpLoading={this.state.isSubmittedLoading}
        onSignUp={this.handleSignUp}
      />
    );
  }
}
